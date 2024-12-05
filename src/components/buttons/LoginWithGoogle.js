'use client';
import {signIn} from "next-auth/react";
import Image from "next/image";

export default function LoginWithGoogle() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/account'})}
      className="bg-white text-black shadow text-center w-full px-3 py-1.5 text-sm/6 font-semibold flex gap-3 items-center justify-center rounded-md hover:bg-gray-100">
        <Image src="/assets/google-icon.svg" alt="Google Logo" width={20} height={20} />
      <span>Google</span>
    </button>
  );
}
