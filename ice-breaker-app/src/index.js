import React from "react";
import { AuthProvider } from "./backend/firebase/AuthContext";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//firebase
import { initializeApp } from "firebase/app";
import { getAuth, linkWithCredential, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyApu8G8fiJ2C8owxYqOKc0wuQdEVU3LELg",
  authDomain: "ice-breaker-5baad.firebaseapp.com",
  projectId: "ice-breaker-5baad",
  storageBucket: "ice-breaker-5baad.appspot.com",
  messagingSenderId: "348957350647",
  appId: "1:348957350647:web:d62d891efab4c8306cd1f2",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("Logged in.");
  } else {
    console.log("No user");
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();