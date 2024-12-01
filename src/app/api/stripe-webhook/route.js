import Stripe from 'stripe';
import mongoose from "mongoose";
import { User } from '@/models/User';

export async function POST(req) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const sig = await req.headers.get('stripe-signature');
    const body = await req.text();
    
    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return Response.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }


    console.log(`Received event with ID: ${event.id}`);

    // Handle the event

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const customerEmail = session.customer_email;
            const customerId = session.customer;

            mongoose.connect(process.env.MONGO_URI);

            const user = await User.findOne({ email: customerEmail });

            if (user) {
                user.isSubscribed = true;
                user.stripeCustomerId = customerId;
                await user.save();
            }

            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    return Response.json({ received: true }, { status: 200 });

}