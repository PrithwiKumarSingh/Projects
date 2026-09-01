import type { ProfileProps } from "./Profile";

export default function Setting({data,setData}: ProfileProps){
    const handleTheme = ( name :string)=>{
        setData((prev)=>({
            ...prev, 
            theme : name
        }))
    }
    return <div>
            <div>
                <label>
                    <input onChange={()=>handleTheme("dark")} name="dark" type="radio" checked={data.theme == "dark" ? true : false} />
                    Dark
                </label>
            </div>
            <div>
                <label>
                    <input onChange={()=>handleTheme("light")} name="light" type="radio" checked={data.theme == "light" ? true : false} />
                    light
                </label>
            </div>
        </div>
}