// 필요한 기능 가져오기
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAlqn5_QVJYT3XHvt29d7ut8_blIJAYgQw",
    authDomain: "react-project-92abd.firebaseapp.com",
    projectId: "react-project-92abd",
    storageBucket: "react-project-92abd.appspot.com",
    messagingSenderId: "435583578100",
    appId: "1:435583578100:web:1a7defc4d23d435c13d3a1"
  };

  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app);