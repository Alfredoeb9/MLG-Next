import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const games = await db.gameCategory.findMany({ select: { game: true, id: true } })

        return NextResponse.json({ games, message: "matches returned"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `${error}`}, { status: 500 })
    }
}