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
const barbersCollection = collection(db, "barbers");

// Barber CRUD methods
export const createBarber = async (barber) => {
  await setDoc(doc(db, "barbers", "Test2"), {
    date: barber.date,
  });
};

export const getBarber = async (id) => {
  const barber = await barbersCollection.doc(id).get();
  return barber.exists ? barber.data() : null;
};

export const getAllBarbers = async function() {
  const query = await getDocs(barbersCollection);
  let barbers = [];
  query.forEach((doc) => {
    barbers.push(doc.id);
  });
  return barbers;
};

export const updateBarber = (id, barber) => {
  return barbersCollection.doc(id).update(barber);
};

export const deleteBarber = (id) => {
  return barbersCollection.doc(id).delete();
};
