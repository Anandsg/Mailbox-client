// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO2RcyM6pWLSv9E5MBtzGACEPx2Chtqxg",
  authDomain: "mailbox-client-62c32.firebaseapp.com",
  projectId: "mailbox-client-62c32",
  storageBucket: "mailbox-client-62c32.appspot.com",
  messagingSenderId: "997756511935",
  appId: "1:997756511935:web:46a1bd55e1eeb7a5f6080a",
  measurementId: "G-538SG2F2VM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
