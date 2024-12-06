// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzQsONwg-KGI6c5SrsQzhMCB6VQBUqAXM",
  authDomain: "gaussjordanmatrix-8ea02.firebaseapp.com",
  projectId: "gaussjordanmatrix-8ea02",
  storageBucket: "gaussjordanmatrix-8ea02.firebasestorage.app",
  messagingSenderId: "918881755306",
  appId: "1:918881755306:web:1928da1d3b9770208bf0d3",
  measurementId: "G-0RDPRVYKQ3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};