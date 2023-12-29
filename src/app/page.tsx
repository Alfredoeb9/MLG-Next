"use client";
import React from 'react'
import { useAppSelector } from '@/redux/hooks';
// import { selectUserAuth } from '@/redux/features/AuthContext';
// import { getServerSession } from 'next-auth';
// import { options } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const data: string[] = [
  'entry 1',
  'entry 2',
  'entry 3',
  'entry 4',
  'entry 5',
  'entry 6',
  'entry 7',
  'entry 8',
  'entry 9',
  'entry 10',
  'entry 11',
]

export default function Home() {
  const router = useRouter()
  // const user = useAppSelector(state => state.authXReducer.user);
  // const session = useSession();

  // const formattedSession = session?.data
  // const session = await getServerSession(options)
  // console.log("session====", formattedSession?.user?.username)
  // console.log("user====", user)
  
  return (
    <main className=" bg-black ">
      <section className='flex min-h-128 flex-col items-start justify-center place-content-center m-auto max-w-7xl px-10'>
        <div className='flex flex-row place-content-start max-h-full'>
          <div className="bg-red-400 h-52 w-2 mr-4" />
          <div>
            <h1 className='text-6xl	text-white'>WELCOME TO YOUR NEW COMPETITIVE JOURNEY</h1>
            <h1 className='text-5xl	text-gray-400'>COMPETE FOR CASH.</h1>
            <h1 className='text-5xl	text-gray-400'>COMPETE FOR ...</h1>

            <button
              className="text-center mt-6 py-4 px-12 border-2 border-slate-300 text-white text-lg hover:scale-105 hover:border-slate-200 transition-all"
              onClick={() => {
                router.push("/auth/sign-up")
              }}
            >
              JOIN MLG
            </button>
          </div>
        </div>
      </section>
      
      
      <section className='flex flex-col m-auto max-w-7xl px-10'>
        <div className='flex flex-row'>
          <div className="bg-red-400 h-10 w-2 mr-4" />
          <div>
            <h2 className='text-xl text-white'>GAMES</h2>
            <p className='text-white'>Select a game and then choose how you want to play.</p>
            <div className='flex flex-row'>
              {data.slice(0,4).map((set: string, i: number) => (
                <Link href={"/cross-platform/tournaments"} key={i} className="border-2 border-slate-500 h-20 text-white">
                  {set}
                </Link>
              ))}
              <Link href={"/tournaments"} className="border-2 border-slate-500 h-20 text-white">
                SEE ALL GAMES
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
