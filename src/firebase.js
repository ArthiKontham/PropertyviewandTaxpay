import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBphoJnVAN-Par-n4sLZ2Z77i-IOict4CI",
  authDomain: "propertycheck-c8ae0.firebaseapp.com",
  projectId: "propertycheck-c8ae0",
  storageBucket: "propertycheck-c8ae0.firebasestorage.app",
  messagingSenderId: "393503941062",
  appId: "1:393503941062:web:05fe172de963d790b792c7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
