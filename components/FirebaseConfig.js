import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0WFSvDLrP6e0kjNFBvo3Tn1JAHnhnEJk",
  authDomain: "chat-app-2-fc76d.firebaseapp.com",
  projectId: "chat-app-2-fc76d",
  storageBucket: "chat-app-2-fc76d.appspot.com",
  messagingSenderId: "785034198767",
  appId: "1:785034198767:web:71a34f5d3039ed1990e51a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);