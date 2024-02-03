import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(req: NextRequest) {
    try {
        // throw new Error("this is an error")
        const body = await req.json();

        const tournament = await db.tournaments.findFirst({
            where: {
                id: body
            }
        })

        if (!tournament) throw new Error("Tournament does not exist")

        return NextResponse.json({ data: tournament, message: "matches returned"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `${error}`, isError: true }, { status: 500 })
    }
}