// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8DNaRAPM_zoDMptxMmKxumb6ig0X9cyc",
    authDomain: "rlvwf-54006.firebaseapp.com",
    projectId: "rlvwf-54006",
    storageBucket: "rlvwf-54006.appspot.com",
    messagingSenderId: "341176641847",
    appId: "1:341176641847:web:22c8e682c978f40ec752b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;