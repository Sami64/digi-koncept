import axios from "axios"
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
import constants from "../core/utils/comet_constants"
import { retrieveCategories } from "../modules/categories/retrieve"

const Home: NextPage = ({
	categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	const { data: session, status } = useSession()

	const getCometUser = async () => {
		try {
			const { data, status } = await axios.get(
				`https://${constants.APP_ID}.api-${constants.REGION}.cometchat.io/v3/users/${session?.userId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "applcation/json",
						apiKey: constants.API_KEY,
					},
				}
			)

			if (status == 200) {
				console.log("Comet user in db", data)
				return data
			}
		} catch (error) {}
	}

	const createCometUser = async () => {
		const user = await getCometUser()

		if (user == null) {
			const { data, status } = await axios.post(
				`https://${constants.APP_ID}.api-${constants.REGION}.cometchat.io/v3/users`,
				{ uid: session?.userId, name: session?.user?.name },
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "applcation/json",
						apiKey: constants.API_KEY,
					},
				}
			)

			if (status == 200) {
				console.log("Comet user", data)
			}
		}
	}

	if (session?.user != null) {
		console.log("Session stuff", session)

		createCometUser()
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
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
	const categories: Category[] = await retrieveCategories()
	return { props: { categories } }
}
