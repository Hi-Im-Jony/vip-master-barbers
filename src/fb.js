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

// creates barber
export const createBarber = async function(barberName) {
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
  });
  await setDoc(doc(db, "barbers", barber.id, "bookings", "init"), {});
  await setDoc(doc(db, "barbers", barber.id, "days_rostered", "init"), {});
};

// delete a barber and their data
export const deleteBarber = async function(barber) {
  /* To delete an entire collection or subcollection in Cloud Firestore, 
  retrieve all the documents within the collection or subcollection and delete them*/

  // Find barber id
  const q = query(collection(db, "barbers"), where("name", "==", barber));
  let barberID = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((doc) => {
    barberID = doc.id;
  });

  console.log(barberID);
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

export const editBarber = async function(selectedBarber, newName) {
  // Find barber id
  const q = query(
    collection(db, "barbers"),
    where("name", "==", selectedBarber)
  );
  let barberID = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((doc) => {
    barberID = doc.id;
  });

  const barberRef = doc(db, "barbers", barberID);
  await updateDoc(barberRef, {
    name: newName,
  });
};

// returns an array with the names of all barbers
export const getAllBarbers = async function() {
  const barbersCollection = collection(db, "barbers");
  const barbersQ = await getDocs(barbersCollection);
  let barbers = [];
  barbersQ.forEach((doc) => {
    barbers.push(doc.data().name);
  });
  return barbers;
};

// roster a barber on given days
export const roster = async function(barber, dayToRoster, times) {
  // Find barber id
  const q = query(collection(db, "barbers"), where("name", "==", barber));
  let barberID = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((doc) => {
    barberID = doc.id;
  });

  let timesStr = [];
  for (let t in times) {
    let time = times[t];
    timesStr.push(time < 10 ? "0" + time + ":00" : time + ":00");
  }

  await setDoc(doc(db, "barbers", barberID, "days_rostered", dayToRoster), {
    timesRostered: timesStr,
  });
};

// de-roster a barber on given days
export const deroster = async function(barber, daysToRemove) {
  // Find barber id
  const q = query(collection(db, "barbers"), where("name", "==", barber));
  let barberID = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((doc) => {
    barberID = doc.id;
  });

  for (let dayToRemove in daysToRemove) {
    await deleteDoc(
      doc(db, "barbers", barberID, "days_rostered", daysToRemove[dayToRemove])
    );
  }
};

// returns an array of days a barber is rostered
export const getRosteredDays = async function(barber) {
  // Find barber id
  const q = query(collection(db, "barbers"), where("name", "==", barber));
  let barberID = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((doc) => {
    barberID = doc.id;
  });

  const rosterCollection = collection(db, "barbers", barberID, "days_rostered");
  const roseterQ = await getDocs(rosterCollection);
  let daysRostered = [];
  roseterQ.forEach((doc) => {
    daysRostered.push(doc.id);
  });

  return daysRostered;
};

export const getRosteredDayTimes = async function(barber, day) {
  // Find barber id
  const q = query(collection(db, "barbers"), where("name", "==", barber));
  let barberID = "";
  const barbersDoc = await getDocs(q);
  barbersDoc.forEach((doc) => {
    barberID = doc.id;
  });

  const docRef = doc(db, "barbers", barberID, "days_rostered", day);
  const daysRostered = await getDoc(docRef);
  let times = [];
  if (daysRostered.data()) times = daysRostered.data().timesRostered;
  else return times;
  for (let t in times) {
    let tS = times[t];
    tS = tS.split(":");
    times[t] = parseInt(tS[0]);
  }
  return times;
};

// create a booking for a barber
export const createBooking = async function(barber, day) {
  console.log(barber);
  console.log(day);
};

export const addService = async function(serviceName, servicePrice) {
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
  });
};

export const getServices = async function() {
  let services = [];
  const colectionRef = collection(db, "services");
  const servicesQ = await getDocs(colectionRef);
  servicesQ.forEach((doc) => {
    services.push(doc.data());
  });
  return services;
};
