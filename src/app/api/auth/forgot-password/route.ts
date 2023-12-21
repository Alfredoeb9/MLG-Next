import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { createToken } from "../../../../../lib/utils/utils";
import { sendResetPasswordLink } from "../[...nextauth]/mailer";

export async function POST(req: Request) {
    try {
        const {email} = await req.json()
        console.log("server", email.length)
        if (email.length === 0) return NextResponse.json({error: "Please refresh and try again!"}, {status: 500})
        
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) return NextResponse.json({ error: "Please refresh and try again!"}, {status: 500});
        const token = await createToken(user.id, user.isAdmin);

        const link = `${process.env.REACT_APP_BASE_URL}/auth/reset-password/${token}`;
        const fullName = user.firstName + " " + user.lastName;
        const dbToken = await db.activateToken.findFirst({
            where: {
                userId: user.id
            }
        })

        if (!dbToken) return NextResponse.json({ error: "Please refresh and try again!"}, {status: 500});
        // console.log("db", dbToken)
        await sendResetPasswordLink(email, fullName, link)
        return NextResponse.json({message: "password resent link sent to email"}, {status: 201});
    } catch (error) {
        return NextResponse.json({error: `Error: ${error}`}, {status: 500});
    }
}