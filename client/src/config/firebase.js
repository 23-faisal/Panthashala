// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvs_m4-TBj-MLRmI6ZiDXOO4ZVrAsRFak",
  authDomain: "panthashala-f666e.firebaseapp.com",
  projectId: "panthashala-f666e",
  storageBucket: "panthashala-f666e.appspot.com",
  messagingSenderId: "40357675527",
  appId: "1:40357675527:web:18761de6929aa2b35be0a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firestore database
export const db = getFirestore(app);

// auth

export const auth = getAuth(app);
