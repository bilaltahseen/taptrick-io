"use client";

import { useState } from "react";

export default function CheckoutButton({ session }) {

    const { user } = session

    const [loading, setLoading] = useState(false)

    const handleClick = async () => {

        try {
            setLoading(true)
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email })
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error)
            }

            const { url } = await response.json();

            window.location.href = url
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <button disabled={loading} onClick={handleClick} className="w-full text-black ring-1 ring-inset ring-black hover:ring-gray-700 focus-visible:outline-black mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10">
            Purchase Subscription
        </button>
    )
}