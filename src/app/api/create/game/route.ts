import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existingTeam = await db.team.findUnique({
      where: {
        teamName: body.teamName,
      },
    });

    if (existingTeam) throw new Error('Sorry Team is already created');

    let team = await db.team.create({
      data: {
        game: body.selectedGames,
        teamName: body.teamName,
      },
    });

    // If a user is already created and you want to associate that user with 
    // a specific team, you need to update the User record with the teamId field.
    await db.user.update({
      where: {
        email: body.user
      },
      data: {
        teamId: team.id
      }
    })

    return NextResponse.json(
      {
        message: `Team Created ${body.teamName}`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
