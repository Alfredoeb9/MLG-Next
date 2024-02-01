import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const games = await db.gameCategory.findMany({ select: { game: true, id: true } })

        return NextResponse.json({ games: games, message: "matches returned"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `${error}`}, { status: 500 })
    }
}