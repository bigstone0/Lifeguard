// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY-J2ASLAJOV8SivIPhnkdSt-KIPZdCSs",
  authDomain: "lifeguard-455c5.firebaseapp.com",
  projectId: "lifeguard-455c5",
  storageBucket: "lifeguard-455c5.appspot.com",
  messagingSenderId: "807337998706",
  appId: "1:807337998706:web:de2d172db3005fd6a2c5eb",
  measurementId: "G-H8FJTGE0ZM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
