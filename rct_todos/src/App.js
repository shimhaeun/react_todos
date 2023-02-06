// 파이어베이스에서 db 가져오기
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from 'react';

function App() {

  const todosCollectionRef = collection(db, "todos");

  useEffect( () => {
    const getLists = async() => {
      const data = await getDocs(todosCollectionRef)
      console.log(data)
    
    }
  })
  getLists();

  return (
    <div>

    </div>
  );
}

export default App;
