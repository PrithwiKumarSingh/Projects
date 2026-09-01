import type {ProfileProps } from "./Profile";

export default function Interests({data, setData,error}: ProfileProps){

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setData((prev)=>({
            ...prev, 
            interests : !e.target.checked ? 
                prev.interests.filter(i=> i !== e.target.name)
             : [...prev.interests , e.target.name] 
        }))
    }

    return <div className="profile-main">
            <div>
                <label >
                    <input name="Coding" onChange={handleChange} type="checkbox" checked={data.interests.includes("Coding")}/>
                    Coding
                </label>
                
            </div>
            <div>
                <label >
                    <input name="Music" onChange={handleChange} type="checkbox" checked={data.interests.includes("Music")} />
                    Music
                </label>
            </div>
            <div>
                <label >
                    <input name="Movies" onChange={handleChange} type="checkbox" checked={data.interests.includes("Movies")} />
                    Movies
                </label>
            </div>
            {error?.interests && <span className="error">{error.interests}</span>}
        </div>
}