import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const bodier = await req.json();
  try {
    
    if (!bodier) throw new Error("Please enroll in a active tournament")

    const successEnroll = await db.tournaments.update({
      where: {
        id: bodier,
      },
      data: {
        enrolled: {
          increment: 1
        }
      }
    })

    if (!successEnroll) throw new Error("Error occured while enrolling, please try again")

    return NextResponse.json(
      {
        message: `Team has enrolled`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
