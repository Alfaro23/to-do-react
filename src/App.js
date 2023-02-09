import React, {useState, useEffect} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import {db} from "./firebase.js";
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore" 
import ToDo from "./ToDo";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100 rounded-full`,
  count: `text-center p-2`
}

function App() {

  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const queryList = query(collection(db, "todos"))
    const unSubScribe = onSnapshot(queryList, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => todosArr.push({...doc.data(), id: doc.id}));

      setToDos(todosArr)
    });

    return () => unSubScribe()
    
  }, [])

  const toggleComplete = async (todo) => {
    await  updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }

  const createToDo = async (event) => {
    event.preventDefault(event)

    if(input === ""){
      alert("Please enter text");
      return
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    })

    setInput("");
  }

  const deleteToDo = async (id) => {
    await deleteDoc(doc(db, "todos", id))
  }


  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>ToDo App</h3>

        <form onSubmit={createToDo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add ToDo"/>
          <button className={style.button}><AiOutlinePlus size={30}/></button>
        </form>
        <ul>
          {todos.map((item, index) => <ToDo key={index} item={item} toggleComplete={toggleComplete} deleteToDo={deleteToDo}/>)}
          
        </ul>
        <p className={style.count}>{`You have ${todos.length} todos`}</p>
      </div>
    </div>
  );
}

export default App;
