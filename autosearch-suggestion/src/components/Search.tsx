import { useEffect, useState } from "react"
import { SlMagnifier } from "react-icons/sl";



export default function Search(){
    const [search, setSearch] = useState("");
    const [data , setData] = useState([]);
    const [visible, setVisible] = useState(true);
    const [cache, setCache] = useState({});

    async function dummyData(){
        if(cache[search]){
            setData(cache[search]);
            console.log("Return From Cache: ", search)
            return;
        }
        console.log("Return From fetch: ", search)
        const res = await fetch(`https://dummyjson.com/products/search?q=${search}`)
        const parseData = await res.json();
        setData(parseData?.products);
        setCache(prev => ({...prev, [search] : parseData?.products}))
        console.log(data);
    }
    useEffect(()=>{

        const timer = setTimeout(dummyData, 500);

        return ()=> {
            clearTimeout(timer);
        }
        
    },[search])


    return(
        <div className=" w-full h-fit max-w-md bg-[#42444D] p-4 rounded-2xl">
            <input
            placeholder="Search here...."
            onFocus={()=>setVisible(true)}
            onBlur={()=>setVisible(false)}
            className="w-full text-white outline-none  rounded-2xl px-4 font-medium" 
            value={search} onChange={(e)=>setSearch(e.target.value)}  type="text" />
            <div className="h-0.5 w-full bg-gray-400"></div>
            <div className=" h-full max-h-84 overflow-y-scroll scrollbar-none">
                {
                    data.map((i,index)=> visible && <button
                    className=" w-full px-4 py-2 rounded-xl hover:bg-gray-800 cursor-pointer text-white flex items-center gap-2" 
                    key={index}>
                        <SlMagnifier/>
                        {/* @ts-ignore */}
                        {i.title}
                    </button>)
                }
            </div>
        </div>
    )
}