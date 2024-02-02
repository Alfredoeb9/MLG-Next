import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
 
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const d = req

        console.log("d", d)
        // res.end(`Post: ${id}`)
        return NextResponse.json({ message: "matches returned"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `${error}`}, { status: 500 })
    }
  
}