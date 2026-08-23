import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

interface todoProps {
    id : number;
    title : string; 
    completed : boolean;
    onDelete : ()=> void;
}

export default function Todo({title, completed, onDelete}:todoProps){

    const [complete, setComplete] = useState(completed);



    return (
        <div className="flex justify-between my-2 items-center bg-amber-100 p-2 rounded-2xl">
            <div className="flex gap-4">
                <div>
                    {
                        complete ? <button 
                         onClick={()=>setComplete(false)}
                         className="h-7 w-7 border-2 rounded-full flex items-center cursor-pointer justify-center bg-green-400">
                            <MdOutlineDone/>
                        </button>
                        : <button
                        onClick={()=>setComplete(true)}
                         className="h-7 w-7 border-2 rounded-full cursor-pointer p-2"></button>
                    }
                </div>
                
                <div className={complete ? "line-through" : ""}>
                    {title}
                </div>
            </div>
            <button
            onClick={onDelete}
            className="cursor-pointer" >
                <IoClose className="hover:rotate-180 transition-all ease-in-out" size={24}/>
            </button>

        </div>
    )
}