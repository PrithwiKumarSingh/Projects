import Accordian from "./components/Accordian";
import { AccordianData } from "./utils/AccordianData";

export default function App(){
  return (
    <div>
        <Accordian items={AccordianData}/>
    </div>
  )
}