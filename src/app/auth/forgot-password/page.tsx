"use client";
import React, { FormEvent, useState } from "react";

export default function ForgotPassword() {
    const [emailChange, setEmailChange] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

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
            console.log("data", data)
            setIsLoading(false);
            setError("");
            return response
        }
    }


    return (
        <div>
            <form onSubmit={handleForgotPassword} action="submit">
                <label>Email:</label>
                <input onChange={(e) => setEmailChange(e.target.value)} placeholder="johndoe@gmail.com" />

                <button disabled={isLoading}>Submit</button>
                {error}
            </form>
        </div>
    )
}