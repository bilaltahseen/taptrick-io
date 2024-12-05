import Stripe from 'stripe';
import mongoose from "mongoose";
import { User } from '@/models/User';
import { Page } from '@/models/Page';
import { Event } from '@/models/Event';

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
            {
                const session = event.data.object;

                mongoose.connect(process.env.MONGO_URI);

                const user = await User.findOne({ email: session.customer_email });

                if (user) {
                    user.isSubscribed = true;
                    user.stripeCustomerId = session.customer;
                    user.stripeSubscriptionId = session.subscription;
                    await user.save();
                }

                break;
            }
        case 'customer.subscription.deleted':
            {
                const subscription = event.data.object;

                mongoose.connect(process.env.MONGO_URI);

                const user = await User.findOne({ stripeCustomerId: subscription.customer });

                if (!user) {
                    return Response.json({ error: 'User not found' }, { status: 200 });
                }

                user.isSubscribed = false;
                user.stripeSubscriptionId = null;
                await user.save();
                await stripe.customers.del(user.stripeCustomerId);

                break
            }
        case 'customer.deleted': {
            const customer = event.data.object;

            mongoose.connect(process.env.MONGO_URI);

            const user = await User.findOne({ stripeCustomerId: customer.id });

            if (!user) {
                return Response.json({ error: 'User not found' }, { status: 200 });
            }

            const page = await Page.findOne({ owner: user.email });

            if (page) {
                await Event.deleteMany({ uri: page.uri });
                await Page.deleteOne({ owner: user.email });
            }

            await User.deleteOne({ email: user.email });

            break;

        }
        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    return Response.json({ received: true }, { status: 200 });

}