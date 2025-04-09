// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgco4L_VmLAeixypyjGHq-cpiOBoMzofE",
  authDomain: "projectdps-151ce.firebaseapp.com",
  projectId: "projectdps-151ce",
  storageBucket: "projectdps-151ce.firebasestorage.app",
  messagingSenderId: "934196175110",
  appId: "1:934196175110:web:9b81e9d090666e3cba7e87",
  measurementId: "G-EYRP5XV361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };