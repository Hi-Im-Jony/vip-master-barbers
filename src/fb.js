// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
  arrayUnion,
} from "firebase/firestore";
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

/******* Barbers *******/
export const createBarber = async function(barberName, pos) {
  // check if barber exists
  const q = query(collection(db, "barbers"), where("name", "==", barberName));
  let barberExists = false;
  const dbQuery = await getDocs(q);
  dbQuery.forEach(() => {
    barberExists = true;
  });
  if (barberExists) return;

  const barber = await addDoc(collection(db, "barbers"), {
    name: barberName,
    position: pos,
  });
  await setDoc(doc(db, "barbers", barber.id, "bookings", "init"), {});
  await setDoc(doc(db, "barbers", barber.id, "days_rostered", "init"), {});
};

// Find barber id
const getBarberID = async function(barberName) {
  const q = query(collection(db, "barbers"), where("name", "==", barberName));
  let barberID = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((doc) => {
    barberID = doc.id;
  });
  return barberID;
};
// delete a barber and their data
export const deleteBarber = async function(barber) {
  let barberID = await getBarberID(barber);

  // Delete roster
  const rosterCollection = collection(db, "barbers", barberID, "days_rostered");
  let rosters = await getDocs(rosterCollection);
  let docIds = [];
  rosters.forEach((doc) => {
    docIds.push(doc.id);
  });
  for (let id in docIds) {
    await deleteDoc(doc(db, "barbers", barberID, "days_rostered", docIds[id]));
  }

  // Delete bookings
  const bookingsCollection = collection(db, "barbers", barberID, "bookings");
  let bookings = await getDocs(bookingsCollection);
  bookings.forEach((doc) => {
    docIds.push(doc.id);
  });
  for (let id in docIds) {
    await deleteDoc(doc(db, "barbers", barberID, "bookings", docIds[id]));
  }

  // Delete barber
  await deleteDoc(doc(db, "barbers", barberID));
};

// edit a barbers details
export const editBarber = async function(selectedBarber, newVals) {
  let barberID = await getBarberID(selectedBarber);

  const barberRef = doc(db, "barbers", barberID);
  await updateDoc(barberRef, newVals);
};

// get names of all Barbers
export const getAllBarbers = async function() {
  const barbersCollection = collection(db, "barbers");
  const q = query(barbersCollection, orderBy("position"));
  const barbersQ = await getDocs(q);
  let barbers = [];
  barbersQ.forEach((doc) => {
    barbers.push(doc.data().name);
  });
  return barbers;
};

/******* Rosters *******/
// roster a barber
export const roster = async function(barber, dayToRoster, times) {
  let barberID = await getBarberID(barber);

  await setDoc(doc(db, "barbers", barberID, "days_rostered", dayToRoster), {
    timesRostered: times,
  });
};

// de-roster a barber on given days
export const deroster = async function(barber, daysToRemove) {
  let barberID = await getBarberID(barber);

  for (let dayToRemove in daysToRemove) {
    await deleteDoc(
      doc(db, "barbers", barberID, "days_rostered", daysToRemove[dayToRemove])
    );
  }
};

// returns an array of days a barber is rostered
export const getRosteredDays = async function(barber) {
  let barberID = await getBarberID(barber);

  const rosterCollection = collection(db, "barbers", barberID, "days_rostered");
  const roseterDocs = await getDocs(rosterCollection);
  let daysRostered = [];
  roseterDocs.forEach((doc) => {
    daysRostered.push(doc.id);
  });

  return daysRostered;
};

export const getRosteredDayTimes = async function(barber, day) {
  let barberID = await getBarberID(barber);

  const docRef = doc(db, "barbers", barberID, "days_rostered", day);
  const daysRostered = await getDoc(docRef);
  let times = [];
  if (daysRostered.data()) times = daysRostered.data().timesRostered;
  return times;
};

/******* Bookings *******/
// create a booking for a barber
export const createBooking = async function(barber, day, time) {
  let barberID = await getBarberID(barber);
  const bookedDayRef = doc(db, "barbers", barberID, "bookings", day);
  const bookedDayDoc = await getDoc(bookedDayRef);
  // if doc exists
  if (bookedDayDoc.data()) {
    await updateDoc(bookedDayRef, {
      bookedTimes: arrayUnion(time),
    });
  } else {
    // else, create doc
    await setDoc(doc(db, "barbers", barberID, "bookings", day), {
      bookedTimes: [time],
    });
  }
};

// retrieve all bookings on requested day for requested barber
export const getBookingsOnDay = async function(barber, day) {
  let barberID = await getBarberID(barber);
  const bookingRef = doc(db, "barbers", barberID, "bookings", day);
  const bookingDoc = await getDoc(bookingRef);
  let bookedTimes = [];
  if (bookingDoc.data()) bookedTimes = bookingDoc.data().bookedTimes;
  return bookedTimes;
};

/******* Services *******/
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

  const service = await addDoc(collection(db, "services"), {
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
  servicesQ.forEach((doc) => {
    services.push(doc.data());
  });
  return services;
};

export const editService = async function(originalName, newVals) {
  // Find service doc id
  const q = query(
    collection(db, "services"),
    where("name", "==", originalName)
  );
  let serviceID = "";
  const serviceDoc = await getDocs(q);
  serviceDoc.forEach((doc) => {
    serviceID = doc.id;
  });

  // update with new vals
  const serviceRef = doc(db, "services", serviceID);
  await updateDoc(serviceRef, newVals);
};

export const deleteService = async function(service) {
  // Find service doc id
  const q = query(collection(db, "services"), where("name", "==", service));
  let serviceID = "";
  const serviceDoc = await getDocs(q);
  serviceDoc.forEach((doc) => {
    serviceID = doc.id;
  });
  await deleteDoc(doc(db, "services", serviceID));
};
