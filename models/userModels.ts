import { NextResponse } from "next/server";
import db from "../lib/db";
import bcrypt from "bcrypt";
import validator from "validator"


export async function registerUser( username: any, firstName: any, lastName: any, email: any, password: any, isAdmin: any) {
    try {

        if (!email || !password) return NextResponse.json({ user: null, message: "All fields mush be filled"})

        if (!validator.isEmail(email)) throw NextResponse.json({user: null, message: "Email is not valid"});

        if (!validator.isStrongPassword(password)) throw Error("Password not strong enough");
        //check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) return NextResponse.json({user: null, message: "User already exists"}, { status: 409 });
        
        //check if username already exists
        const existingByUsername= await db.user.findUnique({
            where: { username: username }
        });
        
        if (existingByUsername) return NextResponse.json({user: null, message: "Username already exists already exists"}, { status: 409 });

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

        return newUser
    } catch (error) {
        return NextResponse.json({ message: "incoming error", error}, { status: 500 })
    }
};