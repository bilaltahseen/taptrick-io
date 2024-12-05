import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "@/components/forms/SignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Taptrick | Login',
  description: 'Share your links, social profiles, contact info and more on one page',
}
export default async function LoginPage() {

  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/account');
  }

  return <SignIn />;
}
