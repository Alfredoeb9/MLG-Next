import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from "./components/header"
import Provider from "./components/provider"
import { getServerSession } from 'next-auth'
import { options } from '../../lib/auth'
import StoreProvider from "./components/storeProvider"

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Provider session={session}>
            <Header />
          </Provider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
