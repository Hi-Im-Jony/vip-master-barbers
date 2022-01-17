// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, collection, setDoc } from "firebase/firestore";
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
const bookingsCollection = collection(db, "bookings");

// CRUD methods
export const createBooking = async (booking) => {
  await setDoc(doc(db, "bookings", "Test2"), {
    date: booking.date,
  });
};

export const getBooking = async (id) => {
  const booking = await bookingsCollection.doc(id).get();
  return booking.exists ? booking.data() : null;
};

export const updateBooking = (id, booking) => {
  return bookingsCollection.doc(id).update(booking);
};

export const deleteBooking = (id) => {
  return bookingsCollection.doc(id).delete();
};
