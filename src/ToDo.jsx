import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    text: `ml-2 cursor-pointer`,
    textCompleted: `ml-2 cursor-pointer line-through`,
    row: `flex `,
    button: `cursor-pointer flex items-center`,
}

const ToDo = ({item, toggleComplete, deleteToDo}) => {
    return(
        <li className={item.completed ? style.liComplete: style.li}>
            <div className={style.row}>
                <input onChange={() => toggleComplete(item)} type="checkbox" checked={item.completed ? "checked" : ""}/>
                <p onClick={() => toggleComplete(item)} className={item.completed ? style.textCompleted : style.text}>{item.text}</p>
            </div>
            <button onClick={() => deleteToDo(item.id)}>{<FaRegTrashAlt />}</button>
        </li>
    )
}

export default ToDo