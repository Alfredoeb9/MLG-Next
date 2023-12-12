"use client";
import React from 'react'
import { useAppSelector } from '../redux/hooks';
import { selectUserAuth } from '../redux/features/AuthContext';
import { getServerSession } from 'next-auth';
import { options } from '../../../lib/auth';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  if (session?.data?.user?.username === "" || session?.data?.user?.username  === undefined || session?.data?.user?.username  === null) {
    return "sorry not allowed"
  }

  const formattedSession = session?.data
  // const session = await getServerSession(options)
  console.log("session====", formattedSession?.user?.username)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This is my profile</h1>
    </main>
  )
}
