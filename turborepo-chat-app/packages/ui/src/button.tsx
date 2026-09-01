"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size : "big" | "small"
  onClick: ()=>void;
}

export const Button = ({ children, onClick, size }: ButtonProps) => {
  return (
    <button
      style={{
            color : "white",
            padding : size=="big" ? 20 : 10, 
            border : "2px solid black",
            fontSize : "20px",
            borderRadius : "10px",
            cursor : "pointer"
        }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
