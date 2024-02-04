"use client";
import React, { useState } from 'react'
import { useAppSelector } from '@/redux/hooks';
import { useQuery } from "@tanstack/react-query"
// import { selectUserAuth } from '@/redux/features/AuthContext';
// import { getServerSession } from 'next-auth';
// import { options } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import {Spinner} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginBanner from '@/components/LoginBanner';
import HomeFeaturedGames from '@/src/app/components/home/HomeFeaturedGames';
import HomeMatchFinder from '@/components/home/HomeMatchFinder';
import Footer from '@/components/Footer';
import Header from '@/components/header';
import ErrorComponent from './components/ErrorComponent';

// const data: string[] = [
//   'entry 1',
//   'entry 2',
//   'entry 3',
//   'entry 4',
//   'entry 5',
//   'entry 6',
//   'entry 7',
//   'entry 8',
//   'entry 9',
//   'entry 10',
//   'entry 11',
// ]

export default function Home() {
  const session = useSession();

  const { data: data, isLoading, isError, isSuccess} = useQuery<any>({
    queryKey: ["game-finder"],
    queryFn: () => 
        fetch('/api/games').then(async (res) => {
          
          if( res.status === 500) return <ErrorComponent />

          return await res.json()
        }),
    retry: 3
  })

//   const user = useQuery<any>({
//     queryKey: ["get-user"],
//     queryFn: async () => {
//       const data = await fetch('/api/user', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({email: session?.data?.user?.email})
//       });

//       const json = await data.json();

//       if (data.status === 500) return router.push('/auth/sign-in')

//       console.log("json", json)
//       return json;      
//     },
//         // fetch('/api/user', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         //     body: JSON.stringify(session?.data.user.email)
//         // }).then(async (res) => {
//         //     let data = await res.json()

//         //     if (res.status === 500) {
//         //         if (data.message.includes("not enrolled in a team")) {
//         //             return router.push("/create/team")
//         //         }
//         //     }

//         //     if (res.status === 201) {
//         //         return data
//         //     }
//         //     return data
//         // }    
//         // ).catch(() => {
//         //     console.log("catch ran up")
//         // }),
//     retry: 3,
//     refetchOnReconnect: true,
    
// })


  const router = useRouter()
  // const user = useAppSelector(state => state.authXReducer.user);
  // const session = useSession();

  // const formattedSession = session?.data
  // const session = await getServerSession(options)
  // console.log("session====", formattedSession?.user?.username)
  // console.log("user====", user)

  // if (isLoading) return <Spinner label="Loading..." color="warning" />

  // console.log("user", user)
  
  return (
    <main className=" bg-slate-950">
      
      <section className='flex min-h-128 flex-col items-start justify-center place-content-center m-auto max-w-7xl px-10'>
        <div className='flex flex-row place-content-start max-h-full'>
          <div className="bg-red-400 h-52 w-2 mr-4" />
          <div>
            <h1 className='text-6xl	text-white'>WELCOME TO YOUR NEW COMPETITIVE JOURNEY</h1>
            <h1 className='text-5xl	text-gray-400'>COMPETE FOR CASH.</h1>
            <h1 className='text-5xl	text-gray-400'>COMPETE FOR ...</h1>

            <Link 
              href={"/auth/sign-up"}
              className="inline-block text-center mt-6 py-4 px-12 border-2 border-slate-300 text-white text-lg hover:scale-105 hover:border-slate-200 transition-all"
            >
              JOIN MLG
            </Link>
          </div>
        </div>
      </section>
      
      
      <HomeFeaturedGames data={isSuccess && data} error={isError} />

      <LoginBanner />

      <HomeMatchFinder />

      <Footer />
    </main>
  )
}
