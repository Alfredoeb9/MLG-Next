"use client";
import React from 'react'
import { useAppSelector } from '@/redux/hooks';
// import { selectUserAuth } from '@/redux/features/AuthContext';
// import { getServerSession } from 'next-auth';
// import { options } from '@/lib/auth';
import { useSession } from 'next-auth/react';

export default function Home() {
  // const user = useAppSelector(state => state.authXReducer.user);
  // const session = useSession();

  // const formattedSession = session?.data
  // const session = await getServerSession(options)
  // console.log("session====", formattedSession?.user?.username)
  // console.log("user====", user)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to new MLGw</h1>
    </main>
  )
}
