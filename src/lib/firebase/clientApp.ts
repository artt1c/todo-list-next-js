import {getApps, initializeApp} from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIFEBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIFEBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIFEBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIFEBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIFEBASE_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIFEBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIFEBASE_MEASUREMENT_ID
};

let app;

if(!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app)
const db = getFirestore(app)

export {
  auth,
  db,
  app
};