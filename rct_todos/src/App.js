// 파이어베이스에서 db 가져오기
import { db } from './firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import './App.css';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import styled, {createGlobalStyle} from "styled-components";
import { Button } from '@mui/material';
// import { styled } from '@material-ui/core/styles'
import { keyframes } from '@emotion/react';

const TdCnt = styled.div`
  margin-left: 0px;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

export const GlobalStyle = createGlobalStyle`
  body{padding:0; margin:0}
`
const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #A7C4B5;
`
const AddBtn = styled.button`
  margin: 20px;
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  color: white;
  font-weight: 600;
  -webkit-appearance: none;
  cursor: pointer;
  &active,
  &focus{
    outline: none;
  }
  background-color: ${props => props.danger ? 'lightseagreen' : '#2ecc71'}
`;

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
    const cfm = window.confirm("정말 삭제하시겠습니까?");

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
          <TdCnt>{value.content}</TdCnt>
          
          <span className='date'>{value.d_date}</span>
          <button onClick={ ()=>{ updateList(value.id, value.content) }}>
            <EditIcon></EditIcon></button>
          
          <button onClick={ ()=>{ deleteList(value.id) }}>
            <DeleteIcon></DeleteIcon></button>
        </h2>
      </div>
    )
  )

  return (
    <div className="App">
      <Container>
      <Rotate>&lt; ToDo List📝💅🏾 &gt;</Rotate>
      <GlobalStyle />
      <TextField type="text" id="standard-basic" label="TODOs" variant="standard"
       onChange={
         (event)=> {setNewList(event.target.value)}
        } />
        <AddBtn danger onClick={createList}>할 일 추가</AddBtn>
      <hr />
      {showList}
    </Container>
    </div>
  );
}

export default App;