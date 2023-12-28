"use client";

import { redirect, usePathname } from 'next/navigation'
import React, { useState } from "react";

export default function ResetPassword() {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>("");
    const [show, setShow] = useState<any>({ password: false });
    const [show2, setShow2] = useState<any>({ password: false });
    const [show3, setShow3] = useState<any>({ password: false });
    const pathName = usePathname();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setMessage("");
        
        try {
            if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
                return setError("Please provide a password")
            }

            const token = pathName.split("/")[3]
            
            const passwordResponse = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                'Content-Type': 'application-json'
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                    token: token
                })
            })

            const response = await passwordResponse.json();

            if (!passwordResponse.ok) {
                setError(response?.message)
                return null;
            }

            setMessage(response?.message);
            // redirect("/auth/sign-in")
            return passwordResponse;
        } catch (error) {
            return setError(error);
        }
    }

    return (
        <div className='flex w-full flex-1 min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8 bg-stone-900 dark:border-gray-700'>
            <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Reset Password</h3>
            <form className='w-72 space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className="block text-sm font-medium leading-6 text-white">Old password:</label>
                            <span
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                                onClick={() => setShow({ ...show, password: !show.password })}
                            >
                                <p className="font-semibold text-indigo-600 hover:text-indigo-500">Show Password</p>
                            </span>
                        </div>
                        
                        <input className='block w-full rounded-md border-0 mt-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' required name='password' type={`${show.password ? "text" : "password"}`} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                    </div>
                    
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className="block text-sm font-medium leading-6 text-white">New password:</label>
                            <span
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                                onClick={() => setShow2({ ...show2, password: !show2.password })}
                            >
                                <p className="font-semibold text-indigo-600 hover:text-indigo-500">Show Password</p>
                            </span>
                        </div>

                        <input className='block w-full rounded-md border-0 mt-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' required name='password' type={`${show2.password ? "text" : "password"}`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                    
                    
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className="block text-sm font-medium leading-6 text-white">Confirm password:</label>
                            <span
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                                onClick={() => setShow3({ ...show3, password: !show3.password })}
                            >
                                <p className="font-semibold text-indigo-600 hover:text-indigo-500">Show Password</p>
                            </span>
                        </div>
                        
                        <input className='block w-full rounded-md border-0 mt-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' required name='password' type={`${show3.password ? "text" : "password"}`} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    </div>
                    
                
                    <button className='flex w-full justify-center rounded-md mt-2 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-500' disabled={isLoading}>
                        Update Password
                    </button>

                    {error && <div>{error}</div>}
                    {message && <div>{message}</div>}
            </form>
        </div>
    )
}