"use client"

import { useEffect, useRef, useState } from "react"
type Tool = "Pencil" | "Rectangle" | "Circle" | "Line"


export default function DrawingCanvas({activeTool:Tool, color }){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const previousPoint = useRef< {x:number; y:number} | null>(null)

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>)=>{
        const point = getMousePosition(e);
        if(!point) return;

        setIsDrawing(true);
        previousPoint.current = point;
    }

    const handleMouseUp = ()=>{
        setIsDrawing(false);

        previousPoint.current = null;
    }



    const getMousePosition = (e : React.MouseEvent<HTMLCanvasElement>)=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        return {x,y};
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>)=>{

        if(!isDrawing) return;

        const canvas = canvasRef.current;
        if(!canvas) return; 

        const context = canvas.getContext("2d");
        if(!context) return;

        const point = getMousePosition(e);
        if(!point) return;

        const previous = previousPoint.current;
        if(!previous) return;

        context.strokeStyle = color;
        context.lineWidth = 5;
        context.lineCap = "round"
        context.lineJoin = "round"
        context.beginPath();

        context.moveTo(
            previous.x,
            previous.y
        )

        context.lineTo(
            point.x,
            point.y
        )

        context.stroke();
        
        context.stroke

        previousPoint.current = point;
    }
    
    useEffect(()=>{ 
        const canvas = canvasRef.current;

        if(!canvas) return;

        const context = canvas.getContext("2d");

        if(!context) return;

        context.fillStyle = "red";

        context.fillRect(200, 100, 200, 100);



    },[])


    return (
        <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="border bg-white"
        />
    )
}