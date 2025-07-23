// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7kBXB7PTLpBXd0LsGbjBehLv_niCyo60",
  authDomain: "cafeck.firebaseapp.com",
  projectId: "cafeck",
  storageBucket: "cafeck.firebasestorage.app",
  messagingSenderId: "1007002128341",
  appId: "1:1007002128341:web:8cca7a30c85e96299ff75c",
  measurementId: "G-LEV98KLRRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);