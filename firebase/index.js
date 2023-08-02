// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbt8jXGQlAE-l_mqYgpVBgZHJBGQRma4s",
  authDomain: "nextjs-firebase-todo-26729.firebaseapp.com",
  projectId: "nextjs-firebase-todo-26729",
  storageBucket: "nextjs-firebase-todo-26729.appspot.com",
  messagingSenderId: "394918360679",
  appId: "1:394918360679:web:677223f51ac978750b86c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
