// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Importar getAnalytics

const firebaseConfig = {
  apiKey: "AIzaSyB7kBXB7PTLpBXd0LsGbjBehLv_niCyo60",
  authDomain: "cafeck.firebaseapp.com",
  projectId: "cafeck",
  storageBucket: "cafeck.firebasestorage.app",
  messagingSenderId: "1007002128341",
  appId: "1:1007002128341:web:8cca7a30c85e96299ff75c",
  measurementId: "G-LEV98KLRRW"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Analytics (opcional, si lo vas a usar)
const analytics = getAnalytics(app);

export { db, analytics }; // Exportar db y analytics