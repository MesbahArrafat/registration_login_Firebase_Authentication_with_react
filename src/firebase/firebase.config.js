// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHbsPccy6pI7Q84RLUiOy7S8GzMldW1nY",
  authDomain: "auth-project-1e9e2.firebaseapp.com",
  projectId: "auth-project-1e9e2",
  storageBucket: "auth-project-1e9e2.appspot.com",
  messagingSenderId: "870884645184",
  appId: "1:870884645184:web:1e701bcd7ecf9c5b65c2a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
