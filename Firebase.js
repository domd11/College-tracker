// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL6A1KdzMmIkVAF0IItzRX7E-sN99zdco",
  authDomain: "college-tracking.firebaseapp.com",
  projectId: "college-tracking",
  storageBucket: "college-tracking.appspot.com",
  messagingSenderId: "145503874125",
  appId: "1:145503874125:web:51b55635067a57170a8004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app); 