import * as tokenClient from "@/libs/tokenClient";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { signIn } from "next-auth/react";

export async function GET(req) {

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
        return Response.json({ error: "Email and token are required" }, { status: 400 });
    }

    try {
        const payload = await tokenClient.verify(token);

        if (payload.email !== email) {
            return Response.json({ error: "Invalid token" }, { status: 400 });
        }

        mongoose.connect(process.env.MONGO_URI);

        const user = await User.findOne({ email });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        if (user.isVerified) {
            return Response.json({ error: "User is already verified" }, { status: 400 });
        }

        user.isVerified = true;
        user.emailVerified = new Date();

        await user.save();

        return Response.redirect(process.env.NEXT_PUBLIC_URL + "/login?verified=true");
    } 
    catch (error) {
        console.error(error);
        return Response.json({ error: "An error occurred" }, { status: 500 });
    }
}