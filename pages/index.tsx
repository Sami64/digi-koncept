import type { NextPage } from "next";
import Head from "next/head";
import CategoriesList from "../components/CategoriesList";
import Header from "../components/Header";

const Home: NextPage = () => {
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
						find the best creators around you
					</h1>
          <h3 className="capitalize text-white">Lorem epsum epmsu stuff</h3>
				</div>
			</div>
			<main className="max-w-screen-xl mx-auto">
        <CategoriesList/>
      </main>
		</div>
	);
};

export default Home;
