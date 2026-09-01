
 interface dataProps { 
    name : string;
    age : number; 
    email : string; 
    interests : string[]; 
    theme : string;
}

export interface errorProps { 
        name? : string, 
        age? : string, 
        email? : string,
        interests? : string
    }


export interface ProfileProps {
    data: dataProps;
    setData: React.Dispatch<React.SetStateAction<dataProps>>;
    error? : errorProps;
}

export default function Profile({data , setData, error}:ProfileProps){




    function handleChange(e : React.ChangeEvent<HTMLInputElement>,item:string){ 
        setData((prevData:dataProps)=>({...prevData,[item]: e.target.value}))
    }

    if(!error){
        return;
    }

    return <div className="profile-main">
            <div>
                <label>Name : </label> 
                <input onChange={(e)=>handleChange(e, "name")} type="text" value={ data.name} />
                    {error.name && <span className="error">{error.name}</span> }
            </div>
            <div>
                <label>Age : </label> 
                <input onChange={(e)=>handleChange(e, "age")} type="number" value={data.age} /> 
                {error.age && <span className="error">{error.age}</span>}
            </div>
            <div>
                <label>Email : </label> 
                <input onChange={(e)=>handleChange(e, "email")} type="text" value={data.email} />
                {error.email && <span className="error">{error.email}</span>} 
            </div>
        </div>
}