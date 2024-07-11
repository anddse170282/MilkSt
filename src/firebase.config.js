// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const otpFirebaseConfig  = {
  apiKey: "AIzaSyBG9oNgpWAvNc42EbCoTGrPPbjbPpiilg8",
  authDomain: "otp-phone-4243e.firebaseapp.com",
  projectId: "otp-phone-4243e",
  storageBucket: "otp-phone-4243e.appspot.com",
  messagingSenderId: "166322766723",
  appId: "1:166322766723:web:69f12e96fb1cfab1f62cb6",
  measurementId: "G-FXSYNZQVJF",
};
const storageFirebaseConfig  = {
  apiKey: "AIzaSyBS4iRn_C6KDkl-r7UhUGawGi9BCQm2VHM",
  authDomain: "imageuploadv3.firebaseapp.com",
  projectId: "imageuploadv3",
  storageBucket: "imageuploadv3.appspot.com",
  messagingSenderId: "519262163364",
  appId: "1:519262163364:web:63fd52bd73b07158207131",
};
// Initialize Firebase
const otpApp = initializeApp(otpFirebaseConfig, "otpApp");
const auth = getAuth(otpApp);

// Initialize Storage Firebase app
const storageApp = initializeApp(storageFirebaseConfig, "storageApp");
const storage = getStorage(storageApp);

export { auth, storage };

