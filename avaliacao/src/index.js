import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js"
import { getFirestore, addDoc, collection, updateDoc, doc, increment, getDocs, deleteDoc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyC4kiqtoCHyGpARexqNtftM1-9NOFD_H3I",
    authDomain: "sistemaestacionamento-aebc0.firebaseapp.com",
    databaseURL: "https://sistemaestacionamento-aebc0-default-rtdb.firebaseio.com",
    projectId: "sistemaestacionamento-aebc0",
    storageBucket: "sistemaestacionamento-aebc0.appspot.com",
    messagingSenderId: "205374632669",
    appId: "1:205374632669:web:afeca9d252ecb2cbdae134"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { addDoc, collection, db, updateDoc, doc, auth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged, 
    increment, getDocs, deleteDoc, query, where, getDoc, sendEmailVerification }