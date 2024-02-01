"use client";
import React from 'react'
import { useAppSelector } from '@/redux/hooks';
import { useQuery } from "@tanstack/react-query"
// import { selectUserAuth } from '@/redux/features/AuthContext';
// import { getServerSession } from 'next-auth';
// import { options } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginBanner from '@/components/LoginBanner';
import HomeFeaturedGames from '@/src/app/components/home/HomeFeaturedGames';
import HomeMatchFinder from '@/components/home/HomeMatchFinder';
import Footer from '@/components/Footer';

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
  const data = useQuery<any>({
    queryKey: ["game-finder"],
    queryFn: () => 
        fetch('/api/games').then((res) =>
            res.json()
        ),
    retry: 3
  })

  console.log("data>>", data)
  const router = useRouter()
  // const user = useAppSelector(state => state.authXReducer.user);
  // const session = useSession();

  // const formattedSession = session?.data
  // const session = await getServerSession(options)
  // console.log("session====", formattedSession?.user?.username)
  // console.log("user====", user)
  
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
      
      
      <HomeFeaturedGames data={data.data} />

      <LoginBanner />

      <HomeMatchFinder />

      <Footer />
    </main>
  )
}
