import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const matches = await db.tournaments.findMany();

        return NextResponse.json({ matches: matches, message: "matches returned"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `${error}`}, { status: 500 })
    }
}