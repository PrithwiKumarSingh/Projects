"use client"

import { useRef, useState } from "react";
import {
    Pencil,
    Square,
    Circle,
    Minus,
    LucideIcon
} from "lucide-react"

type Tool = "Pencil" | "Rectangle" | "Circle" | "Line"


interface ToolbarProps {
    activeTool : Tool;
    setActiveTool : (Tool : Tool)=>void;
    setColor : (color : string)=>void;
}



interface buttonContentProps {
    type : Tool,
    icon : LucideIcon
}

export default function Toolbar({
    activeTool, 
    setActiveTool,
    setColor
}: ToolbarProps){

    const buttonContent:buttonContentProps[] = [
        {
            type : "Pencil", 
            icon : Pencil
        },
        {
            type: "Rectangle",
            icon : Square
        },
        {
            type : "Circle", 
            icon : Circle
        }, 
        {
            type : "Line", 
            icon : Minus
        }
    ]
    return(
        <div className=" absolute top-4 left-1/2 -translate-x-1/2 z-10  flex gap-2 border rounded-xl items-center px-3 py-2 shadow-lg border-zinc-700  bg-zinc-900">
                {
                buttonContent.map((item,index)=> {
                    const Icon = item.icon;
                
                return<button
                    onClick={()=>setActiveTool(item.type)}
                    key={index}
                    className={`
                        ${
              activeTool === item.type
                ? "bg-indigo-500 text-white"
                : "text-zinc-300 hover:bg-indigo-100/20"
            }
                     rounded   p-2 cursor-pointer hover:scale-105  duration-200 transition ease-in-out `}
                >
                    <Icon size={18} />
                </button>})
            }
            </div>

    )
}