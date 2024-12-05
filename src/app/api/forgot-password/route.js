import { User } from "@/models/User";
import mongoose from "mongoose";
import * as tokenClient from "@/libs/tokenClient";
import * as emailClient from "@/libs/emailClient";
import resetPasswordTemplate from "@/libs/templates/resetPassword.hbs";

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

        if (!user.isVerified) {
            return Response.json({ error: "Email is not verified" }, { status: 400 });
        }

        // Check if a password reset email was sent in the last 60 seconds
        if (user.passwordResetAt && (new Date() - user.passwordResetAt) / 1000 < 60) {
            return Response.json({ error: "Password reset email already sent" }, { status: 400 });
        }

        const token = await tokenClient.generate({ email, type: "forgot-password" });

        user.passwordResetToken = token;
        user.passwordResetAt = new Date();
        await user.save();

        const resetPasswordLink = process.env.NEXT_PUBLIC_URL + "/reset-password?token=" + token + "&email=" + email;

        // Send an email with the reset password link
        await emailClient.sendEmail(email, "Reset Password", "", resetPasswordTemplate({ resetPasswordLink }));

        return Response.json({ message: "Reset Password email sent" }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return Response.json({ error: "An error occurred" }, { status: 500 });
    }
}