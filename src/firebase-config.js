// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDHtPr5kSvuqnJZ3SqVGyHai5E3qaBqLpQ",
  authDomain: "prodsales-f289b.firebaseapp.com",
  databaseURL: "https://prodsales-f289b.firebaseio.com",
  projectId: "prodsales-f289b",
  storageBucket: "prodsales-f289b.appspot.com",
  messagingSenderId: "143538449926",
  appId: "1:143538449926:web:6a0088003f5601fba45d87",
  measurementId: "G-DNBE0K0ME2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;