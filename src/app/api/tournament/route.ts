import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const bodier = await req.json();
  try {
    if (!bodier) throw new Error("Please enroll in a active tournament")

    const successEnroll = await db.tournaments.update({
      where: {
        id: bodier.search,
      },
      data: {
        enrolled: {
          increment: 1
        }
      }
    })

    if (!successEnroll) throw new Error("Error occured while enrolling, please try again")

    let creditsUpdated = await db.user.update({
      where: {
        email: bodier.email
      },
      data: {
        credits: {
          decrement: parseInt(bodier.credits)
        }
      }
    })

    console.log("creditsUpdated", creditsUpdated)

    return NextResponse.json(
      {
        message: `Team has enrolled`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
