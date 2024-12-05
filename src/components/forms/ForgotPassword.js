'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "../buttons/LoadingButton";
import toast from "react-hot-toast";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const router = useRouter();

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }

        setLoading(true);

        try {
            const result = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await result.json();

            if (data.error) {
                setError(data.error);
            }

            if (data.message) {
                toast.success(data.message);
                router.push('/verify');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Forgot Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        {error && (<p className="text-red-500 text-sm/6">{error}</p>)}
                    </div>
                    <div>
                        <LoadingButton loading={loading}>Forgot Password</LoadingButton>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    already a member?{' '}
                    <a href="/login" className="font-semibold text-black hover:text-gray-800">
                        Sign in now
                    </a>
                </p>
            </div>
        </div>
    )
}