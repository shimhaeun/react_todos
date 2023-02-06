import { initializeApp } from "firebase/app";
import { getFirebasestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlqn5_QVJYT3XHvt29d7ut8_blIJAYgQw",
  authDomain: "react-project-92abd.firebaseapp.com",
  projectId: "react-project-92abd",
  storageBucket: "react-project-92abd.appspot.com",
  messagingSenderId: "435583578100",
  appId: "1:435583578100:web:1a7defc4d23d435c13d3a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirebasestore(app);
