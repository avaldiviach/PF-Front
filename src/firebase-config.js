// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const VITE_DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const VITE_STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const VITE_MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const VITE_APP_ID = import.meta.env.VITE_APP_ID;
const VITE_MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: VITE_API_KEY || "AIzaSyDHtPr5kSvuqnJZ3SqVGyHai5E3qaBqLpQ",
  authDomain: VITE_AUTH_DOMAIN || "prodsales-f289b.firebaseapp.com",
  databaseURL: VITE_DATABASE_URL || "https://prodsales-f289b.firebaseio.com",
  projectId: VITE_PROJECT_ID || "prodsales-f289b",
  storageBucket: VITE_STORAGE_BUCKET || "prodsales-f289b.appspot.com",
  messagingSenderId: VITE_MESSAGING_SENDER_ID || "143538449926",
  appId: VITE_APP_ID || "1:143538449926:web:6a0088003f5601fba45d87",
  measurementId: VITE_MEASUREMENT_ID || "G-DNBE0K0ME2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;