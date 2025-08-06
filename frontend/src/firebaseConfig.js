// firebase.js or firebaseConfig.js
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyB8ISut6oqyVPYjguaIwnPU8tRfLSGNkpQ",
  authDomain: "route-17.firebaseapp.com",
  projectId: "route-17",
  storageBucket: "route-17.firebasestorage.app",
  messagingSenderId: "245715303654",
  appId: "1:245715303654:web:6ccb82739204d94ba70f27",
  measurementId: "G-76M3R35DVG"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
