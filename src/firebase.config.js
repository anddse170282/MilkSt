// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const otpFirebaseConfig  = {
  apiKey: "AIzaSyBzVlXfmEnsOlNCwzGQd1XLZz3TQX7f79c",
  authDomain: "otpphonephone2.firebaseapp.com",
  projectId: "otpphonephone2",
  storageBucket: "otpphonephone2.appspot.com",
  messagingSenderId: "449574585426",
  appId: "1:449574585426:web:a1d01e60db9a98917a8b8b",
  measurementId: "G-ZBC1VJPQ2N"
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

