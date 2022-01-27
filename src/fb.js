// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  setDoc,
  deleteDoc,
  getDocs,
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
  await setDoc(doc(db, "barbers", barberName), {});
  await setDoc(doc(db, "barbers", barberName, "bookings", "init"), {});
  await setDoc(doc(db, "barbers", barberName, "days_rostered", "init"), {});
};

// delete a barber and their data
export const deleteBarber = async function(barber) {
  /* To delete an entire collection or subcollection in Cloud Firestore, retrieve all the documents within the collection or subcollection and delete them*/
  console.log("Delete", barber, "!");

  // Delete roster
  const rosterCollection = collection(db, "barbers", barber, "days_rostered");
  let query = await getDocs(rosterCollection);
  let docIds = [];
  query.forEach((doc) => {
    docIds.push(doc.id);
  });
  for (let id in docIds) {
    await deleteDoc(doc(db, "barbers", barber, "days_rostered", docIds[id]));
  }

  // Delete bookings
  const bookingsCollection = collection(db, "barbers", barber, "bookings");
  query = await getDocs(bookingsCollection);
  query.forEach((doc) => {
    docIds.push(doc.id);
  });
  for (let id in docIds) {
    await deleteDoc(doc(db, "barbers", barber, "bookings", docIds[id]));
  }

  // Delete barber
  await deleteDoc(doc(db, "barbers", barber));
};

// returns an array with the names of all barbers
export const getAllBarbers = async function() {
  const barbersCollection = collection(db, "barbers");
  const query = await getDocs(barbersCollection);
  let barbers = [];
  query.forEach((doc) => {
    barbers.push(doc.id);
  });
  return barbers;
};

// roster a barber on given days
export const roster = async function(barber, dayToRoster, times) {
  let timesStr = [];
  for (let t in times) {
    let time = times[t];
    timesStr.push(time < 9 ? "0" + time + ":00" : time + ":00");
  }

  await setDoc(doc(db, "barbers", barber, "days_rostered", dayToRoster), {
    timesRostered: timesStr,
  });
};

// de-roster a barber on given days
export const deroster = async function(barber, daysToRemove) {
  const rosterCollection = collection(db, "barbers", barber, "days_rostered");
  for (let dayToRemove in daysToRemove) {
    await deleteDoc(
      doc(db, "barbers", barber, "days_rostered", daysToRemove[dayToRemove])
    );
  }
};

// returns an array of days a barber is rostered
export const getRoster = async function(barber) {
  const rosterCollection = collection(db, "barbers", barber, "days_rostered");
  const query = await getDocs(rosterCollection);
  let daysRostered = [];
  query.forEach((doc) => {
    daysRostered.push(doc.id);
  });

  return daysRostered;
};

// create a booking for a barber
export const createBooking = async function(barber, day) {
  console.log(barber);
  console.log(day);
};
