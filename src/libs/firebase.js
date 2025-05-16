// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOehV8I32CTbwXcvikM92WcLfNQWpnGg4",
  authDomain: "skillafrik-22b2a.firebaseapp.com",
  projectId: "skillafrik-22b2a",
  storageBucket: "skillafrik-22b2a.firebasestorage.app",
  messagingSenderId: "15991425708",
  appId: "1:15991425708:web:4264a5a0cff5af0e11ed09",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
