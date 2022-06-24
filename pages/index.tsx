import type { NextPage } from "next";
import Head from "next/head";
import CategoriesList from "../components/CategoriesList";
import Header from "../components/Header";
import { useRouter } from "next/router";

const Home: NextPage = () => {
	const router = useRouter();
	return (
		<div className="bg-white">
			<Head>
				<title>DigiKoncept</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<div className="flex w-full h-96 bg-banner-image bg-cover items-center justify-center ">
				<div className="flex flex-col backdrop-opacity-10 bg-black/30 w-full h-full items-center justify-center">
					<h1 className="text-5xl uppercase font-extrabold text-white text-center">
						find the best kreators around you
					</h1>
					<h3 className="capitalize text-white">Lorem epsum epmsu stuff</h3>
					<button
						onClick={() => router.push("/map")}
						className=" mt-4 capitalize border-2 border-gray-200 hover:border-digi_primary hover:bg-digi_primary rounded-full px-3 py-2 text-white text-lg"
					>
						find your kreators
					</button>
				</div>
			</div>
			<main className="max-w-screen-xl mx-auto">
				<CategoriesList />
			</main>
		</div>
	);
};

export default Home;
