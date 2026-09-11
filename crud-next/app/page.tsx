"use client"

import DrawingCanvas from "@/components/Canvas/DrawingCanvas";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useState } from "react";

type Tool = "Pencil" | "Rectangle" | "Circle" | "Line"

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>("Pencil");
  const [color, setColor] = useState("#000000");

  const [elements, setElements] = useState<Element[]>([]);

  return (
    <main>
      <h1>My Drawing App</h1>
      <Toolbar 
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      setColor={setColor}
      />
      <DrawingCanvas
        color={color}
        activeTool={activeTool}
       />
    </main>
  );
}