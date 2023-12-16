import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { sentVerifyUserEmail } from "../[...nextauth]/mailer";
import { createToken, emailRegx } from "../../../../../lib/utils/utils";


export async function POST(req: Request) {
  
  const data = await req.json();

  if (data.path === "resend") {
    try {
      const existingUserByEmail = await db.user.findUnique({
        where: { email: data.email }
      });

      if (!existingUserByEmail?.email) {
        throw Error("Email is not registred, Please sign up and verify email");            
      };

      const token = await createToken(existingUserByEmail.id, existingUserByEmail.isAdmin);

      const link = `${process.env.REACT_APP_BASE_URL}/auth/verify-email/${token}`;
      const fullName = existingUserByEmail.firstName + " " + existingUserByEmail.lastName;
      await db.activateToken.create({
          data: {
          token: token,
          userId: existingUserByEmail.id
        }
      })

    await sentVerifyUserEmail(existingUserByEmail.email, fullName, link)

    return NextResponse.json(existingUserByEmail)
    } catch (error) {
      return NextResponse.json(error)
    }
  } else {
    try {
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
                  token: data?.token.toString(),
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
          token: data.token.toString(),
        },
        data: {
          activatedAt: new Date(),
        }
      })
  
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json(error);
    }
  }
}