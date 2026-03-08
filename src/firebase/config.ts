// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

// @ts-ignore
import {
  Auth,
  getAuth, // @ts-ignore
  getReactNativePersistence,
  initializeAuth, // @ts-ignore
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGY-RoDrpjUul82ttlW5bw15dgVhZCPl0",
  authDomain: "tech-challenge-fase-3-50140.firebaseapp.com",
  projectId: "tech-challenge-fase-3-50140",
  storageBucket: "tech-challenge-fase-3-50140.firebasestorage.app",
  messagingSenderId: "722701360220",
  appId: "1:722701360220:web:cfe619a847bdf5b65cda99",
};

// Initialize Firebase

let app: FirebaseApp;
let auth: Auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

const db = getFirestore(app);

export { app, auth, db };
