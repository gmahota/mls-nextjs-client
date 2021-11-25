// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: publicRuntimeConfig.FIREBASE_APIKEY,
  authDomain: publicRuntimeConfig.FIREBASE_AUTHDOMAIN,
  projectId: publicRuntimeConfig.FIREBASE_PROJECTID,
  storageBucket:publicRuntimeConfig.FIREBASE_STORAGEBUCKET,
  messagingSenderId: publicRuntimeConfig.FIREBASE_MESSAGINGSENDERID,
  appId: publicRuntimeConfig.FIREBASE_APPID,
  measurementId: publicRuntimeConfig.FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
