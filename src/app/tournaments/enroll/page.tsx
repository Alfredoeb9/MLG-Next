"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Enroll() {
    const router = useRouter()
    const session = useSession();

    // if (!session.data) return router.push("/auth/sign-in")


    const {data: user} = useQuery<any>({
        queryKey: ["user"],
        queryFn: async () => 
            fetch(`/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(session.data.user.email)
            }).then(async (res) => {
                let data = await res.json()

                if (res.status === 500) {
                    if (data.message.includes("not enrolled in a team")) {
                        return router.push("/create/team")
                    }
                }

                if (res.status === 201) {
                    return data
                }
            }    
            ).catch(() => {
                console.log("catch ran up")
            }),
        retry: 3
    })

    console.log("user", user)
    return (
        <div>this is to enroll</div>
    )
}