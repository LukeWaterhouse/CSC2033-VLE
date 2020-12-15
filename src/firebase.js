import firebase from "firebase/app";
import "firebase/firestore"
require('firebase/auth')


const firebaseConfig = {
    apiKey: "AIzaSyA3wyT8oUJ0efVq_lwj6T4zOVq3ZyNkQiA",
    authDomain: "epiclearning-e3e5d.firebaseapp.com",
    projectId: "epiclearning-e3e5d",
    storageBucket: "epiclearning-e3e5d.appspot.com",
    messagingSenderId: "765306344301",
    appId: "1:765306344301:web:274eb6b7d35b29a9ed8064",
    measurementId: "G-JYYDEWWGFF"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()

export default firebase