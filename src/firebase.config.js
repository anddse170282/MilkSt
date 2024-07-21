// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const otpFirebaseConfig = {
  apiKey: "AIzaSyAxVttlFb1G-0NspatBx5kL88w_YW8u2po",

  authDomain: "otpphone4-4-4-4.firebaseapp.com",

  projectId: "otpphone4-4-4-4",

  storageBucket: "otpphone4-4-4-4.appspot.com",

  messagingSenderId: "858551409036",

  appId: "1:858551409036:web:35c3f674dfb3e396f69ea9",

  measurementId: "G-NK88EH0E1B"
};
const storageFirebaseConfig = {
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

