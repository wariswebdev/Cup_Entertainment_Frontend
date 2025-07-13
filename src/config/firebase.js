import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCg2oolRaHbk64L3gy0hscIfCtBKOYzQ08",
  authDomain: "cup-entertainment.firebaseapp.com",
  projectId: "cup-entertainment",
  storageBucket: "cup-entertainment.firebasestorage.app",
  messagingSenderId: "927030368708",
  appId: "1:927030368708:web:fe5c98ba765977b6a92c91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
