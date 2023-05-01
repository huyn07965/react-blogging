
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAJBPf4sPO0AD4DRLRHhqmpIFdPxySV7Fw",
  authDomain: "monkey-blogging-ec608.firebaseapp.com",
  projectId: "monkey-blogging-ec608",
  storageBucket: "monkey-blogging-ec608.appspot.com",
  messagingSenderId: "651439424377",
  appId: "1:651439424377:web:0f7af2f403059a2c27e5a8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);