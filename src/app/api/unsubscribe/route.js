import Stripe from 'stripe';
import mongoose from "mongoose";
import { User } from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req) {
    try {


        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        mongoose.connect(process.env.MONGO_URI);

        const user = await User.findOne({ email: session?.user?.email });

        if (!user) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        await stripe.subscriptions.cancel(user.stripeSubscriptionId);

        return Response.json({ message: "Unsubscribed successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error creating session:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}