// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6QmNZ_RpgjW_HQ3mcS2vi7I4T2xK1USg",
  authDomain: "react-todo-6d990.firebaseapp.com",
  projectId: "react-todo-6d990",
  storageBucket: "react-todo-6d990.appspot.com",
  messagingSenderId: "515620598399",
  appId: "1:515620598399:web:42a0ad0b8d6f959cccc54a",
  measurementId: "G-WXMNPSGPPZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
