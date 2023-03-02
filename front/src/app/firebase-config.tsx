// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc
  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3AIhhvXtmzgu3rfbiMQIa5fItT7_n2R8",
  authDomain: "abs-olutely.firebaseapp.com",
  projectId: "abs-olutely",
  storageBucket: "abs-olutely.appspot.com",
  messagingSenderId: "691997840129",
  appId: "1:691997840129:web:750ffcf4c36bd3801a0100",
  measurementId: "G-PYR80B20L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore();


export const setFirestoreUser = async (userId: any, userData: any) => {
    const userRef = doc(db, "users", userId);
    return await setDoc(userRef, userData);
  };

export const setFirestoreDoc = async (collection: string, docId: string, docData: any) => {
    const docRef = doc(db, collection, docId);
    return await setDoc(docRef, docData);
  }
