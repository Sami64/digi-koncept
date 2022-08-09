import "antd/dist/antd.css";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoriesList from "../components/categories/CategoriesList";
import Banner from "../components/Banner";
import { Category } from "../core/categories/types";
import Header from "../components/Header";
import { retrieveCategories } from "../modules/categories/retrieve";

const Home: NextPage = () => {
	const router = useRouter();
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async () => {
		const docs = await retrieveCategories();
		setCategories(docs);
	};

	return (
		<div className="bg-digi_background">
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
