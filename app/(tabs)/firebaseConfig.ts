import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Tambahan untuk Database

// Konfigurasi dengan data asli project Anda
const firebaseConfig = {
  apiKey: "AIzaSyBYIqHEenHAgxVs-D1yiBljZbd_1Qsscbw",
  authDomain: "pawm-virtual-lab-kelompok-29.firebaseapp.com",
  projectId: "pawm-virtual-lab-kelompok-29",
  storageBucket: "pawm-virtual-lab-kelompok-29.firebasestorage.app",
  messagingSenderId: "410635378977",
  appId: "1:410635378977:web:76471e0ced62bcef0ede60"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Export Auth dan Database agar bisa dipakai di file lain
export const auth = getAuth(app);
export const db = getFirestore(app);