/* eslint-disable @typescript-eslint/ban-ts-comment */
// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration    
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth();
const firestore = firebase.firestore();

export {auth,firestore};
export default firebase;