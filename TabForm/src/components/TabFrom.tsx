import Interests from "./Interests"
import Profile from "./Profile"
import Setting from "./Setting"
import {useState} from "react"

export interface dataProps { 
    name : string;
    age : number; 
    email : string; 
    interests : string[]; 
    theme : string;
}

export default function TabForm(){

    const [tab, setTab] = useState(0);
    const [data, setData] = useState<dataProps>({
        name: "",
        age: 0,
        email: "",
        interests: [],
        theme: "light"
    })

    type errorProps = { 
        name? : string, 
        age? : string, 
        email? : string,
        interests? : string
    }

    const [error, setError] = useState<errorProps>({});


    const tabs = [
        {
            name       : "Profile", 
            components : Profile,
            validation : ()=>{
                const err : errorProps = {
                    name: "",
                    age: "",
                    email: ""
                }; 
                if(!data.name || data.name.length < 2){
                    err.name = "Name is not valid"
                }
                if(!data.age || data.age < 18){
                    err.age = "age is not valid"
                }
                if(!data.email || data.email.length < 2){
                    err.email = "email is not valid"
                }

                setError(err);
                return err.name || err.age || err.email ? false : true;
            }
        },
        {
            name       : "Interests", 
            components : Interests,
            validation : ()=>{
                const err:errorProps = {}
                if(!data.interests.length){
                    err.interests = "Chose one please !"
                }
                setError(err);
                return err.interests ? false : true;
            }
        },
        {
            name       : "Setting", 
            components : Setting,
            validation : ()=>{
                return true;
            }
        },
    ]

    const ActiveTab = tabs[tab].components; 

    const handleSubmit = ()=>{
        console.log(data);
    }
    return <div>
            <div className="tab-form">
                {
                    tabs.map((i,index)=> <div key={index} onClick={()=>tabs[tab].validation() && setTab(index)} className="tab-button">{i.name}</div>)
                }
            </div>
            <div className="tab-containt">
                {
                    <ActiveTab data={data} setData={setData} error={error} />
                }
            </div>
            <div className="button-comp">
                {tab > 0  && <button onClick={()=>setTab((prev)=> prev - 1)} className="tab-button">Prev</button>}
                {tab < tabs.length-1  && <button onClick={()=>tabs[tab].validation() &&setTab((prev)=> prev + 1)} className="tab-button">Next</button>}
                {tab === tabs.length-1  && <button onClick={handleSubmit} className="tab-button">Submit</button>}
            </div>
        </div>
}