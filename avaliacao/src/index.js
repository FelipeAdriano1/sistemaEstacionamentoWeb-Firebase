import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js"
import { getFirestore, addDoc, collection, updateDoc, doc, increment, getDocs, deleteDoc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { addDoc, collection, db, updateDoc, doc, auth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged, 
    increment, getDocs, deleteDoc, query, where, getDoc, sendEmailVerification }
