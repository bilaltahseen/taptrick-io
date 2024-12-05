export const metadata = {
    title: 'Taptrick | Verify',
    description: 'Share your links, social profiles, contact info and more on one page',
  }

export default function Verify(){

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Verify your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <p>We’ve sent a verification email. Please check your inbox (and spam folder, just in case) to verify your account.</p>
            </div>
        </div>
    )
}