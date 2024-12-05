import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SubscriptionForm from "@/components/forms/SubscriptionForm";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Taptrick | Subscription",
    description:
        "Share your links, social profiles, contact info and more on one page",
};

export default async function SubscriptionPage() {

    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/");
    }

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
        return redirect("/");
    }

    const leanUser = user.toJSON();
    leanUser._id = leanUser._id.toString();

    return <SubscriptionForm user={leanUser} />;
}