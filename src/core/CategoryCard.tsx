import React from "react";
import Avatar from "@mui/material/Avatar";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {};

const CategoryCard: NextPage = (props: Props) => {
	const router = useRouter();
	return (
		<div className="relative flex flex-col m-5 bg-white p-10 drop-shadow-xl items-center justify-center">
			<Image
				src="/icons/coding.png"
				width={150}
				height={48}
				objectFit="contain"
			/>

			<h4 className="my-3 font-bold capitalize cursor-default text-lg py-2">
				computer programming
			</h4>
			<button
				onClick={() => router.push("/categories/cat2/feed")}
				className="mt-auto border-2 border-gray-200 rounded-full px-3 py-2 text-gray-400 text-lg hover:bg-digi_primary hover:text-white"
			>
				32 Creatives
			</button>
		</div>
	);
};

export default CategoryCard;
