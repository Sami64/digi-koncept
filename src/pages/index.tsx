import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import Banner from "../components/Banner"
import CategoriesList from "../components/categories/CategoriesList"
import Header from "../components/Header"
import { Category } from "../core/categories/types"
import { retrieveCategories } from "../modules/categories/retrieve"

const Home: NextPage = ({
	categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	const { data: session, status } = useSession()

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
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
	const categories: Category[] = await retrieveCategories()
	return { props: { categories } }
}
