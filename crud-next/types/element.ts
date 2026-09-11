
export type Tool = "Select" | "Pencil" | "Rectangle" | "Circle" | "Line" ;

export interface RectangleElement{
    id : string;
    type : "Rectangle";
    x : number;
    y : number;
    width : number;
    height : number;
}

export interface CircleElement{
    id : string;
    type : "Circle";
    x : number; 
    y : number; 
    radius : number;
}

export interface LineElement{
    id : string; 
    type : "Line"; 
    x : number; 
    y : number; 
    startX : number;
    startY : number;
    endX : number; 
    endY : number;
}

export type Element = RectangleElement | CircleElement | LineElement