"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Enroll() {
    const router = useRouter()
    const session = useSession();

    // if (!session.data) return router.push("/auth/sign-in")


    const data = useQuery<any>({
        queryKey: ["user"],
        queryFn: () => 
            fetch(`/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(session.data.user.email)
            }).then((res) =>
                res.json()
            ).catch(() => {
                console.log("catch ran up")
            }),
        retry: 3
    })

    console.log("user", data)
    return (
        <div>this is the test</div>
    )
}