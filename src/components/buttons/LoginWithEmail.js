'use client';
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {signIn} from "next-auth/react";

export default function LoginWithEmail() {
  return (
    <button
      onClick={() => signIn('email', { callbackUrl: '/account' })}
      className="bg-white shadow text-center w-full py-4 flex gap-3 items-center justify-center rounded-md hover:bg-gray-200">
      <FontAwesomeIcon icon={faEnvelope} className="h-6" />
      <span>Sign in with email</span>
    </button>
  );
}
