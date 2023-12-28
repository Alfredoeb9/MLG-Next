import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { createToken, emailRegx } from "../../../../../lib/utils/utils";
import { sentVerifyUserEmail } from "../[...nextauth]/mailer";
import db from '../../../../../lib/db';
import validator from 'validator';


export async function POST(req: NextRequest) {
    const body = await req.json();
        const { firstName, lastName, email, username, password, isAdmin = false } = body;

        if (username === "") throw new Error("Please provide a username");
        if (email === "") throw new Error("Please provide a email");
        if (!validator.isEmail(email)) throw new Error("Please provide a proper email");
        if (!validator.isStrongPassword(password)) return new Error("Password not strong enough");
        if (password === "") throw new Error("Please provide a password");
        if (firstName === "") throw new Error("Please provide a firstName");
        if (lastName === "") throw new Error("Please provide a lastName");
    
    try {

        const isEmailValid = await emailRegx(email);

        if (!isEmailValid) {
            throw new Error("Please provide a proper email")
        }

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail?.email === email) {
            throw Error("Looks like an email is set up with us, try logging in!");            
        };

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        })

        if (existingUserByUsername?.username === username) {
            throw Error("Username is taken")
        }

        const salt = await bcrypt.genSalt();
        
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await db.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                password: hashedPassword,
                isAdmin
            }
        });

        const token = await createToken(newUser.id, isAdmin);

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

        // return newUser

        // const awaitUser = await newUser;
        // //@ts-ignore
        // const token = await createToken(awaitUser.id, isAdmin);

        // // send verification function

        // const link = `${process.env.REACT_APP_BASE_URL}/auth/verify-email/${token}`;
        // const fullName = awaitUser.firstName + " " + awaitUser.lastName;
        // await db.activateToken.create({
        //     data: {
        //         token: token,
        //         userId: awaitUser.id
        //     }
        // })
        // await sentVerifyUserEmail(awaitUser.email, fullName, link)
        // return NextResponse.json({ user: awaitUser, message: "User created Successfully"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `${error}`}, { status: 500 })
    }
};
