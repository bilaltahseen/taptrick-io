import Head from "next/head";
import Link from "next/link";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckoutButton from "@/components/buttons/CheckoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Taptrick | Subscribe",
  description:
    "Share your links, social profiles, contact info and more on one page",
};

const tiers = [
  {
    name: '',
    id: 'tier-basic',
    href: '#',
    priceMonthly: '£ 2',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['Link Management', 'Custom Profile URL', 'Analytics', '24-hour support response time'],
    featured: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default async function Subscribe({searchParams}) {

  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    return redirect('/');
  }

  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({email: session?.user?.email});

  if(user.isSubscribed){
    return redirect('/account');
  }

  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
        loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-1">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={"bg-white/60 sm:mx-8 lg:mx-0 rounded-lg shadow-lg px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14"}
          >
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3 items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4" />
                  {feature}
                </li>
              ))}
            </ul>
            <CheckoutButton session={session} />
          </div>
        ))}
      </div>
    </div>
  )
}
