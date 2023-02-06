// 필요한 기능 가져오기
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    // 파이어베이스 코드 복사
  };

  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app);