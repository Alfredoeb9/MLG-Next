
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const id = await req.json();

        const user = await db.user.findFirst({
            where: {
                email: id
            }
        });

        console.log('user', user)

        return NextResponse.json({ message: "yes" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: `${error}` }, { status: 500 })
    }
}