import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function POST(req: Request) {
  try {
      const body = await req.json();

      const user = await db.user.findFirst({
        where: {
          ActivateToken: {
            some: {
              AND: [
                {
                  activatedAt: null,
                },
                {
                  createdAt: {
                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  },
                },
                {
                  token: body.token.toString(),
                }
              ]
            }
          }
        }
      });


      if (!user) return NextResponse.json({ user: null, message: "User does not exist!"})

      await db.user.update({
        where: {
          id: user.id, 
        },
        data: {
          isVerified: true
        }
      })
    
      await db.activateToken.update({
        where: {
          token: body.token.toString(),
        },
        data: {
          activatedAt: new Date(),
        }
      })

      return NextResponse.json(body);
    } catch (error) {
      return NextResponse.json(error)
    }
}