// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIrsibMqJR40T4ZBINtiYI21VvF_2lT_s",
  authDomain: "todolist-ce522.firebaseapp.com",
  projectId: "todolist-ce522",
  storageBucket: "todolist-ce522.appspot.com",
  messagingSenderId: "344750110815",
  appId: "1:344750110815:web:7e5d2e5e6a9f1d6e2a43ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {app,auth,db,storage}
 