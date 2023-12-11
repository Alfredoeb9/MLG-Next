import { NextRequest, NextResponse } from 'next/server';
// import db from "../../../../lib/db";
// import bcrypt from "bcrypt";
// import validator from "validator"
import { createToken, emailRegx } from "../../../../lib/utils/utils";
import { registerUser } from "../../../../models/userModels";
import { sentVerifyUserEmail } from "../auth/[...nextauth]/mailer";
import db from '../../../../lib/db';
import { compare } from 'bcrypt';


export async function POST(req: NextRequest, res: any) {
    try {
        const body = await req.json();

        const { email, password } = body;
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if (!existingUserByEmail){
            return NextResponse.json({ user: null, message: "Email or password do not match"}, { status: 500 });
        };

        const passwordMatch = await compare(password, existingUserByEmail.password);

        if (!passwordMatch) {
            return NextResponse.json({ user: null, message: "Email or password do not match"}, { status: 500 });
        };

        if (existingUserByEmail.isVerified == false) {
            throw new Error("Email is not verified, Please verify email!")
            // return NextResponse.json({ user: null, message: "Email is not verified, Please verify email!"}, { status: 500 })
        };
        // const body = await req.json();
        

        // const isEmailValid = await emailRegx(email);

        // if (!isEmailValid) throw NextResponse.json({message:"Please provide a proper email"});

        // const newUser: any = await registerUser(username, firstName, lastName, email, password, isAdmin);

        // //@ts-ignore
        // const token = await createToken(newUser.id, isAdmin);

        // // send verification function

        // const link = `${process.env.REACT_APP_BASE_URL}/auth/verify-email/${token}`;
        // const fullName = newUser.firstName + " " + newUser.lastName;
        // await db.activateToken.create({
        //     data: {
        //         token: token,
        //         userId: newUser.id
        //     }
        // })
        // await sentVerifyUserEmail(newUser.email, fullName, link)
        return NextResponse.json({ user: existingUserByEmail, message: "User created Successfully"}, { status: 201 });
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "incoming error", error}, { status: 500 })
    }
};