import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const Header: NextPage = () => {
	const router = useRouter();
	return (
		<header>
			<div className="flex bg-digi_primary p-20 items-center py-2 flex-grow">
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
			</div>
		</header>
	);
};

export default Header;
