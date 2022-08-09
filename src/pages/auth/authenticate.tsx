import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AuthPage: React.FC = () => {
	const router = useRouter();
	const [error, setError] = useState();

	const handleSignIn = async () => {
		try {
			await signIn("google", { callbackUrl: "/" });
		} catch (error) {}
	};

	return (
		<div>
			<div>
				<h1>Sign in to continue</h1>
				<button onClick={handleSignIn}>Sign in with google</button>
			</div>
		</div>
	);
};

export default AuthPage;
