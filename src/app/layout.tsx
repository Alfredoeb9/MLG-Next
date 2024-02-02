import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from "@/components/header"
import Provider from "@/src/app/components/providers/Provider"
import { getServerSession } from 'next-auth'
import { options } from '@/lib/auth'
import ReduxProvider from "@/src/app/components/providers/ReduxProvider"
import AppLogoutProvider from "@/src/app/components/providers/AppLogoutProvider"
import { NextUIProviders } from '@/src/app/components/providers/NextUIProvider'
import QueryProvider from './components/providers/QueryProvider'

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
  console.log('ses', session)
  // eliteleagueesports.com

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProviders>
          <AppLogoutProvider>
            <Provider>
              <QueryProvider>
                <ReduxProvider user={session?.user}>
                  <Header />
                  <div className='w-full'>
                    {children}
                  </div>
                  
                </ReduxProvider>
              </QueryProvider>
              
            </Provider>
          </AppLogoutProvider>
        </NextUIProviders>
      </body>
    </html>
  )
}
