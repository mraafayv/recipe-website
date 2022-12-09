import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnEhsBxjCB6Da_GFy0lRmxHeTZCodcqok",
  authDomain: "react-recipes-hub.firebaseapp.com",
  projectId: "react-recipes-hub",
  storageBucket: "react-recipes-hub.appspot.com",
  messagingSenderId: "560466557589",
  appId: "1:560466557589:web:60ba214b047903a1b8f99c",
};

//initialize firebase app
const app = initializeApp(firebaseConfig) 


//initialize services
const db = getFirestore();

//collection reference
// const colRef = collection(db, 'recipes')

export { db };
