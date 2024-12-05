import { User } from "@/models/User";
import mongoose from "mongoose";
import verifyEmailTemplate from "@/libs/templates/verifyEmail.hbs";

export async function POST(req) {

    const { email } = await req.json();

    if (!email) {
        return Response.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        if (user.isVerified) {
            return Response.json({ message: "Email is already verified" }, { status: 200 });
        }

        const token = await tokenClient.generate({ email });

        const verificationLink = process.env.NEXT_PUBLIC_URL + "/api/" + "verify?email=" + email + "&token=" + token;

        await emailClient.sendEmail(email, "Verify your email", "", verifyEmailTemplate({ verificationLink }));

        return Response.json({ message: "Verification email sent" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "An error occurred" }, { status: 500 });
    }

}