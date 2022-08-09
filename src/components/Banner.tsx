import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import bannerImg from "../../public/slider1.jpg";

const Banner: React.FC = () => {
	const router = useRouter();

	return (
		<div className="relative h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]">
			<Image src={bannerImg} layout="fill" objectFit="cover" />
			<div className="absolute text-center w-full h-full backdrop-opacity-10 bg-black/30 flex flex-col items-center justify-center">
				<h1 className="text-5xl uppercase font-extrabold text-white text-center">
					find the best kreators around you
				</h1>
				<h3 className="capitalize text-white">Lorem epsum epmsu stuff</h3>
				<button
					onClick={() => router.push("/map")}
					className=" mt-4 capitalize border-2 border-gray-200 hover:border-digi_primary hover:bg-digi_primary hover:shadow-lg rounded-full px-3 py-2 text-white text-lg"
				>
					find your kreators
				</button>
			</div>
		</div>
	);
};

export default Banner;
