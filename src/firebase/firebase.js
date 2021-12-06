import { getStorage } from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClYRm7igC-X-YJdgYk15BB-87Bg42_Rkw",
    authDomain: "vipegb.firebaseapp.com",
    projectId: "vipegb",
    storageBucket: "vipegb.appspot.com",
    messagingSenderId: "531376132376",
    appId: "1:531376132376:web:522ae53c1a657084468e6d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export default storage;
