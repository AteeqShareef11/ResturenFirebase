
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"




const firebaseConfig = {
  apiKey: "AIzaSyDjJEWdIijfWscxoHM_AQ3EqC9xJY_JIOc",
  authDomain: "new-resturent-app.firebaseapp.com",
  projectId: "new-resturent-app",
  storageBucket: "new-resturent-app.appspot.com",
  messagingSenderId: "970238874114",
  appId: "1:970238874114:web:074fab369249f77a6d4d1b",
  measurementId: "G-GH70KBLD4M"
};
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)

export {app , firestore ,storage,auth};

