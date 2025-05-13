import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA1Wr6yb4fYi28dqwmxDS6tU9ZN8FVIacs",
    authDomain: "quizzop-f5728.firebaseapp.com",
    projectId: "quizzop-f5728",
    storageBucket: "quizzop-f5728.appspot.com",
    messagingSenderId: "121946656226",
    appId: "1:121946656226:web:0d769277842b4e9903fdbb",
    measurementId: "G-GZ2TNRZHZZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("🚀 ~ auth:", auth)
const provider = new GoogleAuthProvider();

export { auth, provider };