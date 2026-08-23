

import { useRef } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";



export default function Signup(){

    const usernameRef = useRef <HTMLInputElement>(null);
    const passwordRef = useRef <HTMLInputElement>(null);
    const emailRef = useRef <HTMLInputElement>(null);

    async function Signup(){
        const data = await axios.post(`http://localhost:3000/register`, 
            {
                username : usernameRef.current?.value,
                email : emailRef.current?.value,
                password : passwordRef.current?.value
            },
        )

        console.log(data);
    }


    return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#dbd8d8]">
            <div 
             className="flex flex-col bg-white p-8 rounded-xl">
                <div className="text-3xl font-bold text-blue-400">
                    Sign up
                </div>
                <div className="text-md font-semibold text-slate-500">
                    Capture ideas before they disappear.
                </div>
            <div className="flex flex-col gap-2 mt-4  ">
                <input className="outline px-4 py-2 rounded-xl" ref={usernameRef} placeholder={"username"} />
                <input className="outline px-4 py-2 rounded-xl" ref={emailRef} placeholder={"email"} />
                <input className="outline px-4 py-2 rounded-xl" ref={passwordRef} placeholder={"password"} />
            </div>
            <div className="text-md text-slate-600 mt-2 hover:text-red-600">
                <a href="/">Forgot password ?</a>
            </div>
            <div className="mt-6">
                <button 
                className="w-full bg-blue-700 text-white px-4 py-2 rounded-2xl font-semibold cursor-pointer"
                 onClick={Signup}> Signup </button> 
            </div>
            <div className="mt-4">
                Already have an account?
                <Link to={"/signup"} className="pl-1 font-medium hover:text-blue-900 transition-all duration-200 underline">
                      Sign up now!
                </Link>
            </div>
            </div>
        </div>
    )
}