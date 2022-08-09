import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import JobCard from "../../../components/job/JobCard";
import { Job } from "../../../core/job/types";
import { retrieveJobs } from "../../../modules/jobs/retrieve";

const Feed: NextPage = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { category } = router.query;
	const [jobs, setJobs] = useState<Job[]>([]);

	if (status == "loading") {
		return <div>Loading</div>;
	}

	if (session?.user == null) {
		router.replace("/auth/authenticate");
	}

	useEffect(() => {
		getJobs();
	}, []);

	const getJobs = async () => {
		const docs = await retrieveJobs(category as string);
		setJobs(docs);
	};

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
							id={job.id}
							category={job.category}
						/>
					))
				) : (
					<h3>No Jobs Here</h3>
				)}
			</div>
		</div>
	);
};

export default Feed;

// export const getServerSideProps: GetServerSideProps = async (
// 	context: GetServerSidePropsContext
// ) => {

// 	return {
// 		props: { session },
// 	};
// };
