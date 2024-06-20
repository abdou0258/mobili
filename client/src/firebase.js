// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "real-estate-9e284.firebaseapp.com",
  projectId: "real-estate-9e284",
  storageBucket: "real-estate-9e284.appspot.com",
  messagingSenderId: "748409982206",
  appId: "1:748409982206:web:ca70d3dd290ade5e1869af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);