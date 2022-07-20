import type { NextPage } from "next";
import Head from "next/head";
import CategoriesList from "../components/categories/CategoriesList";
import Header from "../core/Header";
import { useRouter } from "next/router";
import Banner from "../core/Banner";
import { useEffect, useState } from "react";
import { retrieveCategories } from "../modules/categories/retrieve";
import { Category } from "../core/categories/types";

const Home: NextPage = () => {
	const router = useRouter();
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async () => {
		const docs = await retrieveCategories();
		setCategories(docs)
	};

	return (
		<div className="bg-white">
			<Head>
				<title>DigiKoncept</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Banner />
			<main className="max-w-screen-xl mx-auto">
				<CategoriesList categories={categories} />
			</main>
		</div>
	);
};

export default Home;
