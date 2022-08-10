import "antd/dist/antd.css";
import axios from "axios";
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Banner from "../components/Banner";
import CategoriesList from "../components/categories/CategoriesList";
import Header from "../components/Header";
import { Category } from "../core/categories/types";
import { retrieveCategories } from "../modules/categories/retrieve";

const Home: NextPage = ({
	categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const { data: session, status } = useSession();

	const createChatUser = async () => {
		try {
			const { data, status } = await axios.put(
				"https://api.chatengine.io/users/",
				{
					secret: session?.userId,
					username: session?.user?.name,
				},
				{
					headers: {
						"PRIVATE-KEY": process.env
							.NEXT_PUBLIC_VERCEL_CHATENGINE_KEY as string,
					},
				}
			);
			if (status == 200) {
				console.log("Chatengine user", data);
			}
		} catch (error: any) {
			return alert(`Something went wrong ${error.message}`);
		}
	};

	if (session?.user != null) {
		console.log("Session stuff", session);
		createChatUser();
	}

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

export const getServerSideProps: GetServerSideProps = async () => {
	const categories: Category[] = await retrieveCategories();
	return { props: { categories } };
};
