import type { NextPage } from "next";
import Head from "next/head";
import CategoriesList from "../components/CategoriesList";
import Header from "../components/Header";
import { useRouter } from "next/router";
import Banner from "../components/Banner";

const Home: NextPage = () => {
	const router = useRouter();
	return (
		<div className="bg-white">
			<Head>
				<title>DigiKoncept</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css"
					rel="stylesheet"
				/>
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
