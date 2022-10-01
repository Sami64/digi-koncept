import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import Banner from "../../../components/Banner"
import Header from "../../../components/Header"
import JobCard from "../../../components/job/JobCard"
import { Job } from "../../../core/job/types"
import { retrieveJobs } from "../../../modules/jobs/retrieve"

const Feed: NextPage = ({
	jobs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (status == "loading") {
		return <div>Loading Info</div>
	}

	if (session?.user == null) {
		router.replace("/auth/authenticate")
	}

	return (
		<div className="bg-digi_background">
			<Head>
				<title>
					category - {jobs.length > 0 && jobs[0].category.title.toUpperCase()}
				</title>
			</Head>
			<Header />
			<Banner />
			<div className="max-w-screen-lg mx-16 md:mx-16 lg:mx-auto py-5">
				{jobs.length > 0 ? (
					jobs.map((job) => (
						<JobCard
							key={job.id}
							title={job.title}
							kreatorName={job.kreator.name}
							id={job.id}
							category={job.category}
							images={job.jobImages}
						/>
					))
				) : (
					<h3 className="text-4xl font-bold py-6 text-center capitalize">
						😢 no jobs posted yet
					</h3>
				)}
			</div>
		</div>
	)
}

export default Feed

export const getServerSideProps: GetServerSideProps = async ({
	params,
	query,
}) => {
	const { category } = query
	const jobs: Job[] = await retrieveJobs(category as string)

	return { props: { jobs } }
}
