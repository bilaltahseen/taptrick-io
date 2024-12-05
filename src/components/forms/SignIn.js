'use client';

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginWithGoogle from "../buttons/LoginWithGoogle";
import LoadingButton from "../buttons/LoadingButton";
import toast from "react-hot-toast";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(true);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const router = useRouter();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleCheckboxChange = (e) => setChecked(e.target.checked);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await signIn('credentials', {
            redirect: false,
            username: email,
            password: password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push('/account');
        }

        setLoading(false);
    }

    useEffect(() => {
        const isVerified = new URLSearchParams(window.location.search).get('verified');
        const error = new URLSearchParams(window.location.search).get('error');

        if (error) {
            setError("Invalid email or password");
        }

        if (isVerified === 'true') {
            toast.success('Your account has been verified');
        }

    }, [])

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
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
                        <div className="flex items-center justify-between">
                           
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div class="text-sm">
                                <a href="/forgot-password" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center mb-4">
                            <input id="checkbox" type="checkbox" checked={checked} onChange={handleCheckboxChange} className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2" />
                            <label htmlFor="checkbox" className="ms-2 text-sm font-medium text-black">Remember me</label>
                        </div>
                    </div>
                    <div>
                        {error && (<p className="text-red-500 text-sm/6">{error}</p>)}
                    </div>
                    <div>
                        <LoadingButton loading={loading}>Sign In</LoadingButton>
                    </div>
                </form>

                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <span className="absolute px-3 font-medium text-sm text-gray-900 -translate-x-1/2 bg-slate-50 left-1/2 text-black">Or continue with</span>
                </div>

                <LoginWithGoogle />

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{' '}
                    <a href="/signup" className="font-semibold text-black hover:text-gray-800">
                        Sign up now
                    </a>
                </p>
            </div>
        </div>
    )
}