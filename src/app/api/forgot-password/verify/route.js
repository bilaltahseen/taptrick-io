import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {

    const { email, token, password, confirmPassword } = await req.json();

    if (!email || !token) {
        return Response.json({ error: "Email and token are required" }, { status: 400 });
    }

    try {
        mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        if (user.passwordResetToken !== token) {
            return Response.json({ error: "Invalid token" }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return Response.json({ error: "Passwords do not match" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.passwordResetToken = "";

        await user.save();

        return Response.json({ message: "Password reset successful" }, { status: 200 });

    } catch (error) {

        console.error(error);
        return Response.json({ error: "An error occurred" }, { status: 500 });

    }
}