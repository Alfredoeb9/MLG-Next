"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorComponent from "./ErrorComponent";


export default function Header() {
    const [tuser, setTuser] = useState(false)
    const [error, setError] = useState(false);
    const session = useSession();

    const router = useRouter();
    let user = false

    // setTimeout(() => {
    //     setTuser(true)
    // }, 5000)

    

    const { data } = useQuery<any>({
        queryKey: ["get-user"],
        queryFn: async () => {
            const data = await fetch('/api/user', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: session?.data?.user?.email})
            });
            
            const json = await data.json();

            console.log('json', json)

            if (data.status == 500) {
                return setError(true)
            }
        
            if (data.status === 201) {
                return json;    
            }
              
        },
            // fetch('/api/user', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(session?.data.user.email)
            // }).then(async (res) => {
            //     let data = await res.json()
    
                // if (res.status === 500) {
                //     if (data.message.includes("not enrolled in a team")) {
                //         return router.push("/create/team")
                //     }
                // }
    
            //     if (res.status === 201) {
            //         return data
            //     }
            //     return data
            // }    
            // ).catch(() => {
            //     console.log("catch ran up")
            // }),
        enabled: session.data?.user !== undefined ? true : false,
        retry: 3,
        refetchOnReconnect: 'always',
        refetchOnMount: 'always',
        refetchOnWindowFocus: 'always',
    });

    // status could === 
    // unauthenticated || authenticated


    return (
        <header className="nav">
            <div className="w-full h-16 px-4 flex items-center justify-between bg-gray-200 dark:bg-gray-800 rounded-b-lg">
                <nav className="h-12 flex gap-x-4 items-center">
                    <Link className="text-md font-semibold text-zinc-100" href={"/"}>MLG</Link>
                    <Link className="text-md font-bold text-zinc-900" href="/">Home</Link>
                    <Link className="text-md font-bold text-zinc-900" href="/profile">Profile</Link>
                    <Link className="text-md font-bold text-zinc-900" href="/protected">Protected</Link>
                </nav>
                <div>
                    {session.status !== "authenticated" ? (
                        <div className="flex flex-row">
                            <Link
                                href={`/auth/sign-in`}
                                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                            >
                                Sign in
                            </Link>
                            <Link
                                href={`/auth/sign-up`}
                                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {/* <ErrorComponent /> */}
                            {data?.credits}
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name={session.data.user.firstName + ' ' + session?.data.user.lastName}
                                    size="sm"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" disabledKeys={["profile"]}>
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{session?.data.user.email}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">My Settings</DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">Stats</DropdownItem>
                                    <DropdownItem key="buy_credits"><Link href={"/pricing"}>Buy Credits</Link></DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                    <DropdownItem key="logout" color="danger" onClick={async (e) => {
                                                e.preventDefault();
                                                await signOut();
                                                router.push("/");
                                            }}>
                                    Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                                
                        </div>
                    )}
                </div>
			</div>

            {error && <ErrorComponent message="There was problem retrieving your credits, please refresh and try agian. If this problem presist please reach out to customer service"/>}
        </header>
    )
}