// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG9oNgpWAvNc42EbCoTGrPPbjbPpiilg8",
  authDomain: "otp-phone-4243e.firebaseapp.com",
  projectId: "otp-phone-4243e",
  storageBucket: "otp-phone-4243e.appspot.com",
  messagingSenderId: "166322766723",
  appId: "1:166322766723:web:69f12e96fb1cfab1f62cb6",
  measurementId: "G-FXSYNZQVJF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
