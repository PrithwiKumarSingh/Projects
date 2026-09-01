import { RefObject } from "react"

type TextInputProps = {
    placeholder : string;
    size : "small" | "big";
}

export function TextInput({
    placeholder,
    size
}:TextInputProps){
    return <input
        style={{
            color : "white",
            padding : size=="big" ? 20 : 10, 
            margin : size=="big" ? 20 : 10,
            border : "2px solid black",
            fontSize : "20px"
            
        }}
     placeholder={placeholder}  />
}