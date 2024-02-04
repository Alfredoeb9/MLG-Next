import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import Provider from "@/src/app/components/providers/Provider"
import { getServerSession } from 'next-auth'
import { options } from '@/lib/auth'
import ReduxProvider from "@/src/app/components/providers/ReduxProvider"
import AppLogoutProvider from "@/src/app/components/providers/AppLogoutProvider"
import { NextUIProviders } from '@/src/app/components/providers/NextUIProvider'
import QueryProvider from './components/providers/QueryProvider'
import ErrorComponent from './components/ErrorComponent'
import Header from '@/components/header'
import 'react-toastify/dist/ReactToastify.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Major League Gaming',
  description: 'Major League Gaming',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options)
  // eliteleagueesports.com

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProviders>
          {/* <AppLogoutProvider> */}
            <Provider>
              <QueryProvider>
                <ReduxProvider user={session?.user}>
                  
                  <div className='w-full'>
                    <Header />
                    {children}
                  </div>
                  
                </ReduxProvider>
              </QueryProvider>
              
            </Provider>
          {/* </AppLogoutProvider> */}
        </NextUIProviders>
      </body>
    </html>
  )
}
