import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

var auth_obj = firebase.auth();
var storage_obj = firebase.storage();

export default firebase;
export const auth = auth_obj;
export const storage = storage_obj;