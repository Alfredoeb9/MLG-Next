
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const email = await req.json();
    try {
        throw new Error("User is not enrolled in a team")
        const user = await db.user.findFirst({
            where: {
                email: email.email
            }
        });

        if (user.teamId === null) throw new Error("User is not enrolled in a team")

        return NextResponse.json({ data: user }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: `${error}` }, { status: 500 })
    }
}