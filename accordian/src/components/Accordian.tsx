import {useState} from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import type { itemsProps } from "../utils/AccordianData";

interface MyComponentProps { 
    items : itemsProps[];
}


export default function Accordian({items}: MyComponentProps){

    const [isShowDesc, setShowDesc] = useState<number | null>(null);

    function handleButton(index:number){ 
        setShowDesc(isShowDesc == index ? null : index)
    }

    return (
        <div className="accordian-main">
            {
                items.map((item: itemsProps, index:number)=>{
                    return <div key={index}>
                        <button
                        onClick={()=>handleButton(index)}
                         className="accordian-title">
                         {item.title}

                        { isShowDesc == index ? <IoIosArrowUp/> : 
                         <IoIosArrowDown/>
                         }
                         </button>
                         {
                            isShowDesc === index && <div className="acco-desc">
                                {
                                    item.description
                                }
                            </div>

                         }
                        </div>
                })
            }
        </div>
    )

}