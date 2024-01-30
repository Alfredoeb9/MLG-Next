import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const matches = await db.tournaments.findMany();

        console.log("mat", matches)
        return NextResponse.json({ matches: matches, message: "matches returned"}, { status: 201 });
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: `${error}`}, { status: 500 })
    }
}