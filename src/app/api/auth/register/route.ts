import { NextRequest, NextResponse } from 'next/server';
// import db from "../../../../lib/db";
// import bcrypt from "bcrypt";
// import validator from "validator"
import { createToken, emailRegx } from "../../../../../lib/utils/utils";
import { registerUser } from "../../../../../models/userModels";
import { sentVerifyUserEmail } from "../[...nextauth]/mailer";
import db from '../../../../../lib/db';


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, username, password, isAdmin = false } = body;

        const isEmailValid = await emailRegx(email);

        if (!isEmailValid) throw NextResponse.json({message:"Please provide a proper email"});

        const newUser: any = await registerUser(username, firstName, lastName, email, password, isAdmin);

        //@ts-ignore
        const token = await createToken(newUser.id, isAdmin);

        // send verification function

        const link = `${process.env.REACT_APP_BASE_URL}/auth/verify-email/${token}`;
        const fullName = newUser.firstName + " " + newUser.lastName;
        await db.activateToken.create({
            data: {
                token: token,
                userId: newUser.id
            }
        })
        await sentVerifyUserEmail(newUser.email, fullName, link)
        return NextResponse.json({ user: newUser, message: "User created Successfully"}, { status: 201 });
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "incoming error", error}, { status: 500 })
    }
};