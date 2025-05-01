import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDTziE-oiuvmqeyKf2Mz38Y_YLjKusO56k",
    authDomain: "quizzop-1.firebaseapp.com",
    projectId: "quizzop-1",
    storageBucket: "quizzop-1.firebasestorage.app",
    messagingSenderId: "115548247770",
    appId: "1:115548247770:web:818d3867e4c831ea5eb7e3",
    measurementId: "G-EX4RSTPYE9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };