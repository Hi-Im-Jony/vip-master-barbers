// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  setDoc,
  getDoc,
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

// creates empty doc in db for new barber
export const createBarber = async (barberName) => {
  await setDoc(doc(db, "barbers", barberName), {});
  await setDoc(doc(db, "barbers", barberName, "bookings", "init"), {});
  await setDoc(doc(db, "barbers", barberName, "days_rostered", "init"), {});
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

export const rosterBarber = async function(barberName, daysRostered) {};
