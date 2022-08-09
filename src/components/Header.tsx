import { LogoutIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Header: NextPage = () => {
	const router = useRouter();
	const session = useSession();

	return (
		<header>
			<div className="flex bg-digi_primary p-20 items-center py-2 flex-grow fixed top-0 left-0 right-0 z-50 justify-between">
				<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Image
						onClick={() => router.push("/")}
						src="https://links.papareact.com/f90"
						width={150}
						height={40}
						objectFit="contain"
						className="cursor-pointer"
					/>
				</div>
				<div className="flex flex-row items-center justify-center">
					<h1 className="text-white font-bold text-lg text-center">
						Hi {session.data?.user == null ? "Guest" : session.data?.user?.name}
					</h1>
					{session.data?.user != null && (
						<LogoutIcon
							onClick={() => signOut()}
							className="h-6 mx-3 text-white text-lg text-center cursor-pointer"
						/>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
