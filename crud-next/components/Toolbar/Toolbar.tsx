"use client"

type Tool = "Pencil" | "Rectangle" | "Circle" | "Line"


interface ToolbarProps {
    activeTool : Tool;
    setActiveTool : (Tool : Tool)=>void;
    setColor : (color : string)=>void;
}

const buttonContent = [
    {
        type : "Pencil",
    },
    {
        type : "Rectangle",
    },
    {
        type : "Circle",
    },
    {
        type : "Line",
    },
]

export default function Toolbar({
    activeTool, 
    setActiveTool,
    setColor
}: ToolbarProps){
    return(
        <div className="mb-4 flex flex-col items-center border rounded p-4 w-fit">
            <div className="flex gap-8 mb-4 border rounded p-4 w-fit">
                {
                buttonContent.map((item,index)=> <button
                    key={index}
                    className="border border-dashed px-4 py-2 rounded cursor-pointer hover:scale-105 hover:border-indigo-700 hover:text-indigo-700 duration-200 transition ease-in-out"
                >{item.type}</button>)
            }
            </div>
            <div className="flex gap-2">
                <button onClick={()=>setColor("#fc0303")} className="h-6 w-6 bg-[#fc0303] cursor-pointer rounded"></button>
                <button onClick={()=>setColor("#07fc03")} className="h-6 w-6 bg-[#07fc03] cursor-pointer rounded"></button>
                <button onClick={()=>setColor("#0b03fc")} className="h-6 w-6 bg-[#0b03fc] cursor-pointer rounded"></button>
                <button onClick={()=>setColor("#fcad03")} className="h-6 w-6 bg-[#fcad03] cursor-pointer rounded"></button>
                <button onClick={()=>setColor("#fc03e8")} className="h-6 w-6 bg-[#fc03e8] cursor-pointer rounded"></button>
            </div>
            
        </div>
    )
}