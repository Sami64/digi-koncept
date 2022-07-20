import type { NextPage } from "next";
import Head from "next/head";
import CategoriesList from "../core/CategoriesList";
import Header from "../core/Header";
import { useRouter } from "next/router";
import Banner from "../core/Banner";

const Home: NextPage = () => {
	const router = useRouter();
	return (
		<div className="bg-white">
			<Head>
				<title>DigiKoncept</title>
				<link rel="icon" href="/favicon.ico" />
				
			</Head>

			<Header />
			<Banner />
			<main className="max-w-screen-xl mx-auto">
				<CategoriesList />
			</main>
		</div>
	);
};

export default Home;
