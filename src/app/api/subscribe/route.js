import Stripe from 'stripe';
import mongoose from "mongoose";
import { User } from '@/models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {

        const body = await req.json();

        // Get the user's email from the request body
        const { email } = body

        // Check if the user already exists in the database

        mongoose.connect(process.env.MONGO_URI);

        const user = await User.findOne({ email })

        // If the user not found, return an error

        if (!user) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        // If the user is already subscribed, return an error

        if (user.isSubscribed) {
            return Response.json({ error: 'User is already subscribed' }, { status: 400 });
        }

        // Create a new strip session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,  // Use your price ID here
                    quantity: 1,
                },
            ],
            customer_email: email,
            success_url: `${process.env.NEXT_PUBLIC_URL}/account`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/subscribe`,
        });
        return Response.json({ url: session.url }, { status: 200 });
    } catch (error) {
        console.error("Error creating session:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}