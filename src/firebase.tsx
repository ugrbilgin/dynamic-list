// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlKYICAFv6ZJg6rB07yirsHV3IeX8E64M",
  authDomain: "dynamic-list-223db.firebaseapp.com",
  projectId: "dynamic-list-223db",
  storageBucket: "dynamic-list-223db.appspot.com",
  messagingSenderId: "927030584295",
  appId: "1:927030584295:web:18a2602555f9e51bf2d342",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);