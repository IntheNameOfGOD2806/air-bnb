// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBriMbSW8bEQdDz1A70eecxTl86Na3Zxpg",
  authDomain: "projectexe-53cff.firebaseapp.com",
  projectId: "projectexe-53cff",
  storageBucket: "projectexe-53cff.firebasestorage.app",
  messagingSenderId: "699515769636",
  appId: "1:699515769636:web:ca381d45118189151059b1",
  measurementId: "G-WE67R9PKR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("Firebase initialized",analytics);
export {app};