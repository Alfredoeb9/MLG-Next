"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Header() {
    const { data: session, status } = useSession();

    const router = useRouter();

    console.log("status", status)

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
                    {status !== "authenticated" ? (
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
                        <Link
                            href={`/api/auth/signout`}
                            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                            onClick={(e) => {
                                e.preventDefault();
                                signOut();
                                router.push("/");
                            }}
                        >
                            Sign out
                        </Link>
                    )}
                </div>
			</div>
        </header>
    )
}