import EmailProvider from "next-auth/providers/email";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";

export const options = {
    providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM
		})
	],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(db),
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60* 60
    },
    pages: {
        signIn: "/auth/sign-in",
        verifyRequest: "/auth/verify-email"
    },
    callbacks: {
        async session({session, user}) {
            session.user = user;
            return session;
        }
    },
    events: {
        async signIn({user}) {
            console.log({user}, 'Signed in')
        }
    }
} satisfies AuthOptions;