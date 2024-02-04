import { NextResponse } from "next/server"
import db from "@/lib/db";
import bcrypt, { compare } from "bcrypt";

export async function POST(req: Request) {
    try {
        const { oldPassword, newPassword, token } = await req.json()

        if ( oldPassword.length === 0 || newPassword.length === 0 ) {
            return NextResponse.json({error: "Please provide a password"}, {status: 500})
        }
        const dbToken = await db.activateToken.findFirst({
            where: {
                token: token
            }
        })

        if (!dbToken) return NextResponse.json({ error: "Please refresh and try again!" }, {status: 500})

        const user = await db.user.findFirst({
            where: {
                id: dbToken.userId
            }
        })

        const checkPassword = await compare(oldPassword, user.password)

        if (!checkPassword) return NextResponse.json({ user: null, message: "Please refresh and try again"}, {status: 500})

        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword
            }
        })
        return NextResponse.json({message: "Password reset"}, {status: 201})
    } catch(error) {

        return NextResponse.json({ error: `Error: ${error}`}, {status: 500})
    }
}