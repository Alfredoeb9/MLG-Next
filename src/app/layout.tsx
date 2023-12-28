import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from "./components/header"
import Provider from "./components/Provider"
import { getServerSession } from 'next-auth'
import { options } from '../../lib/auth'
import ReduxProvider from "./components/ReduxProvider"
import AppLogout from "./components/AppLogout"

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
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <StoreProvider> */}
        <AppLogout>
          <Provider>
              <Header />
              <ReduxProvider user={session?.user}>
                {children}
              </ReduxProvider>
            </Provider>

        </AppLogout>
          
          
          
        {/* </StoreProvider> */}
      </body>
    </html>
  )
}
