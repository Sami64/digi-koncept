import { signIn } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useState } from "react"

const AuthPage: React.FC = () => {
	const router = useRouter()
	const [error, setError] = useState()

	const handleSignIn = async () => {
		try {
			await signIn("google", { callbackUrl: "/" })
		} catch (error) {}
	}

	return (
		<div className="bg-digi_background h-screen grid place-items-center">
			<Head>
				<title>Sign In</title>
			</Head>
			<div className="bg-white p-32 rounded-2xl">
				<h1 className="text-xl font-bold mb-5">Sign in to continue</h1>
				<button
					onClick={handleSignIn}
					className="bg-white active:bg-slate-50 text-slate-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
				>
					<img alt="..." className="w-5 mr-1" src="/img/google.svg" />
					Sign in with google
				</button>
			</div>
		</div>
	)
}

export default AuthPage
