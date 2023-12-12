"use client";
import React from "react";
import SignIn from "../../components/signIn";

export default async function SignInPage() {
    
    // console.log("sess", session)
    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <SignIn />
        </div>
    );
}