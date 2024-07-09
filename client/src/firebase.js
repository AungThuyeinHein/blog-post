// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEYS,
  authDomain: "bc-svlog.firebaseapp.com",
  projectId: "bc-svlog",
  storageBucket: "bc-svlog.appspot.com",
  messagingSenderId: "158017711870",
  appId: "1:158017711870:web:6aac12ac7e76ad6a3e3faf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
