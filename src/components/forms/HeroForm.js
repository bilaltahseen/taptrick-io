'use client';

import {signIn} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import {useEffect} from "react";

export default function HeroForm({user}) {
  const router = useRouter();
  useEffect(() => {
    if (
      'localStorage' in window
      && window.localStorage.getItem('desiredUsername')
    ) {
      const username = window.localStorage.getItem('desiredUsername');
      window.localStorage.removeItem('desiredUsername');
      redirect('/account?desiredUsername=' + username);
    }
  }, []);
  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector('input');
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push('/account?desiredUsername='+username);
      } else {
        window.localStorage.setItem('desiredUsername', username);
        await signIn('google');
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20 rounded-md">
          <span className="sm:block hidden bg-white py-4 pl-4 rounded-md">
            links.taptrick.io/
          </span>
      <input
        type="text"
        className="ml-2 sm:ml-0"
        style={{backgroundColor:'white',marginBottom:0,paddingLeft:0}}
        placeholder="Username"/>
      <button
        type="submit"
        className="bg-black hover:bg-gray-800 rounded-md text-slate-50 py-4 px-6 whitespace-nowrap">
        Join for £2 / month
      </button>
    </form>
  );
}
