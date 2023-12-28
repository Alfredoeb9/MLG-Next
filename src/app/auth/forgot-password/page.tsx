"use client";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export default function ForgotPassword() {
    const router = useRouter()
    const [emailChange, setEmailChange] = useState<string>("");
    const [error, setError] = useState<string | any>("");
    const [message, setMessage] = useState<string>("");
    const [count, setCount] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailChange})
            })
    
            const data = await response.json();
    
            if (!response.ok) {
                setIsLoading(false);
                return setError(data.error)
            }
            
            if (response.ok) {
                setIsLoading(false);
                setError("");
                setMessage(data.message)
                
                return response
            }

            
        } catch (error) {
            return setError(error);
        }

        

        
    }


    useEffect(() => {
        if (message) [
            setTimeout(() => {
                router.push("/")
                
            }, 10000)
        ]
        
    }, [message])


    return (
        <div className="flex bg-stone-900 min-h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Forgot Password</h3>
            <form className="w-96 space-y-2" onSubmit={handleForgotPassword} action="submit">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
                <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="email"
                    required
                    onChange={(e) => setEmailChange(e.target.value)} 
                    placeholder="johndoe@gmail.com" 
                />

                <button
                    disabled={isLoading || emailChange.length === 0}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-500"
                >
                    Submit
                </button>
                {error && <div className="text-red-500">{error}</div>}
                {message && 
                    <div className="text-blue-500">
                        {message} 
                        <br></br> 
                        You will auto redirected to the homepage in 10 seconds
                    </div>}
                
            </form>
        </div>
    )
}