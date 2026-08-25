import axios from "axios";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { MdOutlineDone,MdOutlineModeEdit } from "react-icons/md";
import { BACKEND_URL } from "../config/config";

interface todoProps {
    id : number;
    title : string; 
    completed : boolean;
    onDelete : ()=> void;
    addTodo : ()=>void;
}

export default function Todo({id,title, completed, onDelete, addTodo}:todoProps){

    const [complete, setComplete] = useState(completed);
    const [editTitle, setEditTitle] = useState(title);
    const [edit, setEdit] = useState(true);
    const token  = localStorage.getItem("token");

    async function deleteTodo(id:number){
         await axios.delete(`${BACKEND_URL}/todo/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    }

    async function isComplete(id:number){
         await axios.patch(`${BACKEND_URL}/todo/${id}`,
             {
                completed : complete ? false : true
            }
         ,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        setComplete(complete ? false : true);
    }

    async function editMode(id:number) {
        await axios.patch(`${BACKEND_URL}/todo/${id}`,{
            title : editTitle
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
    )
    setEdit(true);

    }



    return (
        <div className="flex justify-between my-2 items-center bg-amber-100 p-2 rounded-2xl">
            <div className="flex gap-4">
                <div>
                    {
                        complete ? <button
                         onClick={()=>isComplete(id)}
                         className="h-7 w-7 border-2 rounded-full flex items-center cursor-pointer justify-center bg-green-400">
                            <MdOutlineDone/>
                        </button>
                        : <button
                        onClick={()=>isComplete(id)}
                         className="h-7 w-7 border-2 rounded-full cursor-pointer p-2"></button>
                    }
                </div>
                
                <input 
                defaultValue={title}
                onChange={(e)=>setEditTitle(e.target.value)}
                disabled={edit}
                className={`${complete ? "line-through" : ""}
                              ${edit ? "" : "line-clamp-none outline rounded-sm px-2"}`}/>
            </div>
            <div className="flex  items-center gap-2">
                <button
                onClick={()=>setEdit(false)}
                className="cursor-pointer" >
                    <MdOutlineModeEdit className="hover:scale-105 transition-all ease-in-out" size={20}/>
                </button>
                <div className="flex items-center justify-center">
                    {
                        edit ? <button
                            onClick={onDelete}
                            className="cursor-pointer" >
                                <IoClose onClick={()=>deleteTodo(id)} className="hover:rotate-180 transition-all ease-in-out" size={24}/>
                            </button>
                            : <button
                                
                                className="cursor-pointer" >
                                    <FaSave onClick={()=>editMode(id)} className="hover:scale-105 transition-all ease-in-out" size={22}/>
                              </button>
                    }

                
                </div>
            </div>

        </div>
    )
}