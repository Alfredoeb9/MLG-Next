import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import { useAppDispatch } from "../src/app/redux/hooks";
import { useState } from "react";
import { login } from "../src/app/redux/features/AuthContext";
import { compare } from "bcrypt";

export const options = {
    providers: [

		// EmailProvider({
		// 	server: process.env.EMAIL_SERVER,
		// 	from: process.env.EMAIL_FROM
		// })

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
            //   if (!credentials?.email || !credentials?.password) {
            //     return null
            //   }
            //   const dispatch = useAppDispatch();
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials) 
                });

                const user = await response.json()

                console.log("user", user)

                const existingUserByEmail = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });
                console.log("exist", existingUserByEmail)
                if (!existingUserByEmail){
                    return null;
                }

                // const passwordMatch = await compare(credentials.password, existingUserByEmail.password);

                // if (!passwordMatch) {
                //     return null;
                // }

                // localStorage.setItem("user", JSON.stringify(existingUserByEmail));
                // dispatch(login(existingUserByEmail));
                
                return {
                    id: existingUserByEmail.id,
                    username: existingUserByEmail.username,
                    email: existingUserByEmail.email
                }
            }
        })
	],
    jwt: {
        maxAge: 24 * 60 * 60 * 1000
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60* 60
    },
    pages: {
        signIn: "/auth/sign-in"
    },
    callbacks: {
        // async jwt({token, account, user}) {
        //     if (account) {
        //         token.accessToken = account.access_token;
        //         token.id = user.id
        //     }

        //     return token
        // },
        async session({session, user}) {
            session.user = user;
            return session;
        },
    },
    events: {
        // async signIn({user}) {
        //     console.log("user signed in ", user)
        //     // if (user === null || user === undefined || user.email == "") return null
        //     const dispatch = useAppDispatch();

        //     const existingUserByEmail = await db.user.findUnique({
        //         where: {
        //             email: user.email,
        //             username: "a3aad33c"
        //         }
        //     });

        //     console.log("user", existingUserByEmail)

        //     if (existingUserByEmail) {
        //         localStorage.setItem("user", JSON.stringify(user));
        //         dispatch(login(user));
        //     }
        // }
    }
} satisfies AuthOptions;