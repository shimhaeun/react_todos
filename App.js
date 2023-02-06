// 파이어베이스에서 db 가져오기
import { db } from './firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [changed, setChanged] = useState(false)

  const [newList, setNewList] = useState("");
  // console.log(newList)

  const [todos, setList] = useState([])
  const todosCollectionRef = collection(db, "todos");
  
  useEffect( () =>{
    const getLists = async () => {
      const data = await getDocs(
        query(todosCollectionRef, orderBy("timeStamp", "desc"))
      )
      // console.log(data)
      setList( 
        data.docs.map( 
          (doc)=>(
            { ...doc.data(), id:doc.id}
          )
        )
      )
    }
    
    getLists();
    setChanged(false)
  }, [changed])
  
  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

  const createList = async () => {
    await addDoc(todosCollectionRef, 
      {
        content:newList, 
        d_date:now_date,
        timeStamp:date
      }
    )
    setChanged(true)
  }

  const updateList = async (id, content)=> {
    // console.log(id + "/" + content);
    const msg = window.prompt("TO DO", content)

    if(msg){
      // id를 이용하여 업데이트 할 데이터 검색
      const listDoc = doc(db, 'todos', id)
      // 업데이트 할 데이터
      const editField = {
        content:msg, 
        d_date:now_date,
        timeStamp:new Date()
      }
      // updateDoc(어떤 데이터, 어떤 값) 데이터 업데이트
      await updateDoc(listDoc, editField)
      setChanged(true)
    }
  }

  const deleteList = async (id) => {
    const cfm = window.confirm("Are you sure?");

    if(cfm){
      // id를 이용하여 삭제할 데이터 검색
      const listDoc = doc(db, 'todos', id)
      // deleteDoc(어떤 데이터, 어떤 값) 데이터 업데이트
      await deleteDoc(listDoc)
    }
    setChanged(true)
  }

  const showList = todos.map(
    (value) => (
      <div key={value.id}>
        <h2>
          {value.content}
          <span className='date'>{value.d_date}</span>
          <button onClick={ ()=>{ updateList(value.id, value.content) } }>EDIT</button>
          <button onClick={ ()=>{ deleteList(value.id) } }>DELETE</button>
        </h2>
      </div>
    )
  )

  return (
    <div className="App">
      <input type="text" placeholder='todos...' onChange={
        (event)=> {setNewList(event.target.value)}
        } />
        <button onClick={createList}>Add List</button>
      <hr />
      {showList}
    </div>
  );
}

export default App;
