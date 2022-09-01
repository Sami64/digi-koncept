import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Banner from "../../../components/Banner"
import Header from "../../../components/Header"
import JobCard from "../../../components/job/JobCard"
import { retrieveJobs } from "../../../modules/jobs/retrieve"

const Feed: NextPage = ({
	jobs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (status == "loading") {
		return <div>Loading</div>
	}

	if (session?.user == null) {
		router.replace("/auth/authenticate")
	}

	return (
		<div className="bg-digi_background">
			<Header />
			<Banner />
			<div className="max-w-screen-lg mx-auto py-5">
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
					<h3>No Jobs Here</h3>
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
	const jobs = await retrieveJobs(category as string)

	return { props: { jobs } }
}
