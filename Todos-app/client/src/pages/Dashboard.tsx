import { useEffect, useRef, useState } from "react";
import Todo from "../components/Todo"
import { FcTodoList } from "react-icons/fc";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: number;
  username: string;
}

interface todoProps {
    id : number
    title : string;
    description? : string;
    completed : boolean;
}




export default function Dashboard(){



  const todo = useRef <HTMLInputElement>(null);
  const [todos, setTodos] = useState<todoProps[]>([]);

  useEffect(()=>{
    async function TodosData(){
        const token = await localStorage.getItem("token");
        if(token){
            const decoded = jwtDecode<JwtPayload>(token);
            console.log(decoded.userId);

        const response = await axios.get(`http://localhost:3000/todo/${decoded.userId}`,
                {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })

        console.log(response);
        setTodos(response.data.todos);
  

        }

    }
    TodosData();
  },[])

 async  function addTodo(){

    const token = localStorage.getItem("token");
    const title = (todo?.current?.value)?.trim();
    if(!title){
        alert("Todos Empty");
        return;
    }

    const response = await axios.post(`http://localhost:3000/todo`,
        {
            title
        },
        {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    )

    setTodos((item)=>[...item,response.data.todo])

    if(todo.current){
        todo.current.value = ""
    }
    
    
  }



  function todoDelete(id:number){
    const data = todos.filter((item)=> item.id !== id);
    setTodos(data);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-700">
      <div className="bg-white rounded-2xl p-4">
            <div className="text-3xl font-bold flex items-center gap-2 my-2">
              To-Do List <span><FcTodoList/></span>
            </div>
            <div className="flex justify-between bg-gray-200 rounded-2xl">
              <input
              defaultValue={todo.current?.value}
              ref={todo}
               className="outline-none px-4 text-xl font-medium" type="text" />
              <button
                className="px-8 py-4 bg-orange-300 font-semibold cursor-pointer rounded-2xl"
                onClick={addTodo}
              >Add</button>
            </div>

          {/* To-do Content */}
            <div className="w-full mt-4 max-h-80 overflow-y-scroll min-h-40">
            {
              [...todos].sort((a,b)=> b.id-a.id).map(({id, title, completed})=> <Todo
                id = {id}
                key={id}
                title={title}
                completed={completed}
                onDelete={()=>todoDelete(id)}

              ></Todo>)
            }
            </div>
      </div>  
    </div>
  )
}