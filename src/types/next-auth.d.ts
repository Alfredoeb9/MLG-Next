import NextAuth, { DefaultSession } from "next-auth"

declare module 'next-auth' {
    interface User {
        username: string
        firstName: string
        lastName: string
    }
    interface Session {
        user: User & {
            username: string
            firstName: string
            lastName: string
        }
        token: {
            username: string
            firstName: string
            lastName: string
        } & DefaultSession["user"]
    }
}