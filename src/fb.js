// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGTr2gj-ymYoCekQf2n6TrFDdYn6zq1H0",
  authDomain: "vip-master-barbers.firebaseapp.com",
  projectId: "vip-master-barbers",
  storageBucket: "vip-master-barbers.appspot.com",
  messagingSenderId: "467374404596",
  appId: "1:467374404596:web:cf83ed53edc524e3f8bfa1",
  measurementId: "G-14QNKT8PS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

/******* Barbers *******/
// Find barber id
const getBarberId = async function(barberName) {
  const q = query(collection(db, "barbers"), where("name", "==", barberName));
  let barberId = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((barber) => {
    barberId = barber.id;
  });
  return barberId;
};

export const createBarber = async function(
  barberName,
  subheading,
  description,
  pos
) {
  // check if barber exists
  const q = query(collection(db, "barbers"), where("name", "==", barberName));
  const dbQuery = await getDocs(q);
  dbQuery.forEach(() => {
    return;
  });

  await addDoc(collection(db, "barbers"), {
    name: barberName,
    position: pos,
    subheading: subheading,
    description: description,
  });
};

// delete a barber and their data
export const deleteBarber = async function(barber) {
  let barberId = await getBarberId(barber);

  // Deroster all rostered days
  deroster(barber, "*");

  // Delete bookings
  const q = query(collection(db, "bookings"), where("barberId", "==", barber));
  const qSnapshot = await getDocs(q);
  qSnapshot.forEach((booking) => {
    deleteBooking(booking.id);
  });

  // Delete barber
  await deleteDoc(doc(db, "barbers", barberId));
};

// edit a barbers details
export const editBarber = async function(selectedBarber, newVals) {
  let barberId = await getBarberId(selectedBarber);

  const barberRef = doc(db, "barbers", barberId);
  await updateDoc(barberRef, newVals);
};

// get barber details
export const getBarber = async function(barberName) {
  let barberId = await getBarberId(barberName);
  const barberRef = doc(db, "barbers", barberId);
  const barber = await getDoc(barberRef);
  return barber.data();
};

export const getBarberImgUrl = async function(barberName) {
  let imgUrl = await getDownloadURL(
    ref(storage, "barber_imgs/" + barberName + ".jpeg")
  );
  return imgUrl;
};

// get names of all Barbers
export const getAllBarbers = async function() {
  const barbersCollection = collection(db, "barbers");
  const q = query(barbersCollection, orderBy("position"));
  const barbersQ = await getDocs(q);
  let barbers = [];
  barbersQ.forEach((barber) => {
    barbers.push(barber.data().name);
  });
  return barbers;
};

/******* Rosters *******/
// roster a barber
export const roster = async function(barber, dayToRoster, times) {
  let bID = await getBarberId(barber);

  await addDoc(collection(db, "schedules"), {
    barberId: bID,
    date: dayToRoster,
    hours: times,
  });
};

// de-roster a barber on given days
export const deroster = async function(barber, daysToRemove) {
  let barberId = await getBarberId(barber);

  const schedulesRef = collection(db, "schedules");
  const q = query(schedulesRef, where("barberId", "==", barberId));

  const qSnapshot = await getDocs(q);

  if (daysToRemove !== "*")
    qSnapshot.forEach((schedule) => {
      if (daysToRemove.includes(schedule.data().date))
        deleteDoc(doc(db, "schedules", schedule.id));
    });

  if (daysToRemove === "*")
    qSnapshot.forEach((schedule) => {
      deleteDoc(doc(db, "schedules", schedule.id));
    });
};

// returns an array of days a barber is rostered
export const getRosteredDays = async function(barber) {
  let barberId = await getBarberId(barber);

  const schedulesRef = collection(db, "schedules");
  const q = query(schedulesRef, where("barberId", "==", barberId));
  const qSnapshot = await getDocs(q);

  let dates = [];
  qSnapshot.forEach((schedule) => {
    dates.push(schedule.data().date);
  });
  return dates;
};

export const getRosteredDayTimes = async function(barber, date) {
  let barberId = await getBarberId(barber);

  const schedulesRef = collection(db, "schedules");
  const q = query(
    schedulesRef,
    where("barberId", "==", barberId),
    where("date", "==", date)
  );
  const qSnapshot = await getDocs(q);

  let times = [];
  qSnapshot.forEach((schedule) => {
    times = schedule.data().hours;
  });
  return times;
};

/******* Bookings *******/
// create a booking for a barber
export const createBooking = async function(
  barber,
  date,
  time,
  service,
  customer
) {
  let barberId = await getBarberId(barber);
  let serviceId = await getServiceId(service);
  await addDoc(collection(db, "bookings"), {
    barberId: barberId,
    date: date,
    time: time,
    serviceId: serviceId,
    customer: customer,
  });
};

// retrieve all bookings on requested day for requested barber
export const getBookedTimes = async function(barber, date) {
  let barberId = await getBarberId(barber);

  const bookingsRef = collection(db, "bookings");
  const q = query(
    bookingsRef,
    where("barberId", "==", barberId),
    where("date", "==", date)
  );
  const qSnapshot = await getDocs(q);

  let times = [];
  qSnapshot.forEach((booking) => {
    times.push(booking.data().time);
  });
  return times;
};

// delete (cancel) a booking
export const deleteBooking = async function(bookingID) {
  await deleteDoc(doc(db, "bookings", bookingID));
};

/******* Services *******/
// Find barber id
const getServiceId = async function(service) {
  const q = query(collection(db, "services"), where("name", "==", service));
  const barbersDoc = await getDocs(q);

  let id = "";
  barbersDoc.forEach((service) => {
    id = service.id;
  });
  return id;
};

export const addService = async function(
  serviceName,
  servicePrice,
  servicePos
) {
  // check if service exists
  const q = query(collection(db, "services"), where("name", "==", serviceName));
  let serviceExists = false;
  const dbQuery = await getDocs(q);
  dbQuery.forEach(() => {
    serviceExists = true;
  });
  if (serviceExists) return;

  await addDoc(collection(db, "services"), {
    name: serviceName,
    price: servicePrice,
    position: servicePos,
  });
};

export const getServices = async function() {
  let services = [];
  const colectionRef = collection(db, "services");
  const q = query(colectionRef, orderBy("position"));

  const servicesQ = await getDocs(q);
  servicesQ.forEach((service) => {
    services.push(service.data());
  });
  return services;
};

export const editService = async function(originalName, newVals) {
  let serviceId = await getServiceId(originalName);
  // update with new vals
  const serviceRef = doc(db, "services", serviceId);
  await updateDoc(serviceRef, newVals);
};

export const deleteService = async function(service) {
  let serviceId = await getServiceId(originalName);
  await deleteDoc(doc(db, "services", serviceId));
};
