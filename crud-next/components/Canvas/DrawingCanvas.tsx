"use client"

import { useRef, useState } from "react"
type Tool = "Pencil" | "Rectangle" | "Circle" | "Line"

interface DrawingCanvasProps{
    color: string;
    activeTool : Tool;
}

export default function DrawingCanvas({color, activeTool}:DrawingCanvasProps){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const previousPoint = useRef< {x:number; y:number} | null>(null)
    const startPoint = useRef< {x:number; y:number} | null>(null)

    console.log(activeTool);

    const clearCanvas = ()=>{
        const canvas = canvasRef.current;

        if(!canvas) return;

        const context = canvas.getContext("2d");
        if(!context) return;

        context.clearRect(
            0,
            0,
            canvas.width, 
            canvas.height
        );
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>)=>{
        const point = getMousePosition(e);
        if(!point) return;

        setIsDrawing(true);

        if(activeTool==="Pencil"){
            previousPoint.current = point;
        }
        else{
            startPoint.current = point;
        }
    }

 const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>)=>{

        if(activeTool==="Rectangle"){
            const canvas = canvasRef.current;
            if(!canvas) return;
            const context = canvas.getContext("2d");
            if(!context) return;
            const start = startPoint.current;
            if(!start) return;
            const endPoint = getMousePosition(e);
            if(!endPoint) return;

            const width = endPoint.x - start.x;
            const height = endPoint.y - start.y;
            context.strokeStyle = color;
            context.lineWidth = 5;

            context.strokeRect(start.x, start.y, width, height);
        }

        if(activeTool==="Circle"){
            const canvas = canvasRef.current;
            if(!canvas) return;
            const context = canvas.getContext("2d");
            if(!context) return;
            const start = startPoint.current;
            if(!start) return;
            const endPoint = getMousePosition(e);
            if(!endPoint) return;

            const width = endPoint.x - start.x;
            const height = endPoint.y - start.y;

            const CenterX = start.x + width/2; 
            const CenterY = start.y + height/2;

            const radiusX = Math.abs(width/2);
            const radiusY = Math.abs(height/2);

            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = 5;

            context.ellipse(
                CenterX,
                CenterY,
                radiusX,
                radiusY,
                0,
                0,
                Math.PI * 2
            )
            context.stroke();


        }



        if(activeTool==="Line"){

        const canvas = canvasRef.current;
        if(!canvas) return;

        const context = canvas.getContext("2d");
        if(!context) return;

        const endPoint = getMousePosition(e);
        if(!endPoint) return;

        const start = startPoint.current;
        if(!start) return;

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 3;

        context.moveTo(start.x, start.y);

        context.lineTo(endPoint.x, endPoint.y);

        context.stroke()

        startPoint.current = null;

    }
        setIsDrawing(false);

        previousPoint.current = null;
        startPoint.current = null;
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


        if(activeTool!=="Pencil") return;

        if(!isDrawing) return;

        const canvas = canvasRef.current;
        if(!canvas) return; 

        const context = canvas.getContext("2d");
        if(!context) return;

        const point = getMousePosition(e);
        if(!point) return;

        const previous = previousPoint.current;
        if(!previous) return;

        
        context.beginPath();
        context.strokeStyle = color;    
        context.lineWidth = 3;
        context.lineCap = "round"

        context.moveTo(
            previous.x,
            previous.y
        )

        context.lineTo(
            point.x,
            point.y
        )

        context.stroke();
    
        previousPoint.current = point;
    
        
    }
    


    return (
        <div>
            <div className=" absolute my-2 right-5 bottom-5 z-10">
                <button
                onClick={clearCanvas}
                 className="border border-dashed px-4 py-2 rounded cursor-pointer hover:scale-105 bg-red-600 text-white duration-200 transition ease-in-out">Clear Canvas</button>
            </div>
        <canvas 
        ref={canvasRef} 
        width={1900} 
        height={950} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onMouseMove={handleMouseMove} 
        className=" bg-white border border-gray-300 rounded-lg shadow-sm cursor-crosshair " />
        </div>
    )
}