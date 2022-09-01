import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Header from "../../components/Header"
import KreatorJobCard from "../../components/users/KreatorJobCard"
import { Job } from "../../core/job/types"
import { retrieveKreatorJobs } from "../../modules/jobs/retrieve"
import { retrieveKreator } from "../../modules/users/retrieve"

const KreatorInfo: NextPage = ({
	kreator,
	jobs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>{kreator.name}</title>
			</Head>
			<div className="bg-digi_background h-full py-28">
				<Header />
				<div className="max-w-screen-lg px-8 py-10 mx-auto bg-white rounded-xl shadow-xl">
					{/** Profile info */}
					<div className="flex space-x-5 mb-10 md:flex-row flex-col">
						{/** Profile Image */}
						<div className="h-48 w-52 mb-3 md:mb-0 relative rounded-full border-2 border-digi_primary mx-auto">
							<Image
								src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
								layout="fill"
								objectFit="cover"
								className="rounded-full h-48 w-52"
							/>
						</div>
						{/** Demographics i think */}
						<div className="flex flex-grow rounded-2xl p-5 flex-col border border-digi_primary space-y-1">
							<h5 className="text-xl font-extrabold text-slate-500">
								<i className="fas fa-user text-digi_primary mr-3"></i>
								{kreator.name}
							</h5>

							<h5 className="text-xl font-extrabold text-slate-500">
								<i className="fas fa-at text-digi_primary mr-3"></i>
								{kreator.email}
							</h5>

							<h5 className="text-xl font-extrabold text-slate-500">
								<i className="fas fa-phone text-digi_primary mr-3"></i>
								{kreator.phone}
							</h5>

							<h5 className="text-xl font-extrabold text-slate-500 capitalize">
								<i className="fas fa-briefcase text-digi_primary mr-3"></i>
								{kreator.category.title}
							</h5>
						</div>
					</div>
					{/**  Job Section */}
					<div className="border border-digi_primary p-5 rounded-xl">
						<h1 className="text-2xl text-slate-500 font-extrabold capitalize">
							{kreator.name.substring(0, kreator.name.indexOf(" "))}'s content
						</h1>
						<hr />
						{jobs.length < 1 && (
							<h1 className="text-center text-slate-500">
								kreator has no content
							</h1>
						)}
						<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-10">
							{jobs.map((job: Job) => (
								<KreatorJobCard job={job} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default KreatorInfo

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const kreator = await retrieveKreator(query.id as string)
	console.log("kreator id", query.id)
	const jobs = await retrieveKreatorJobs(query.id as string)
	console.log("kreator jobs", jobs)
	return { props: { kreator, jobs } }
}
