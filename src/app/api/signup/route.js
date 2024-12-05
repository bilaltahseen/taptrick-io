import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as emailClient from "@/libs/emailClient";
import * as tokenClient from "@/libs/tokenClient";
import verifyEmailTemplate from "@/libs/templates/verifyEmail.hbs";

export async function POST(req) {

    const { email, password } = await req.json();

    if (!email || !password) {
        return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    try {
        mongoose.connect(process.env.MONGO_URI);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return Response.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ email, password: hashedPassword });

        const token = await tokenClient.generate({ email });
        const verificationLink = process.env.NEXT_PUBLIC_URL + "/api/" + "verify?email=" + email + "&token=" + token;

        await emailClient.sendEmail(email, "Verify your email", "", verifyEmailTemplate({ verificationLink }));

        return Response.json({ message: "Please verify your email" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "An error occurred" }, { status: 500 });
    }
}