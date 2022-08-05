import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import JobCard from "../../../components/job/JobCard";
import Banner from "../../../core/Banner";
import Header from "../../../core/Header";
import { Job } from "../../../core/job/types";
import { retrieveJobs } from "../../../modules/jobs/retrieve";

const Feed: NextPage = () => {
	const router = useRouter();
	const { category } = router.query;
	const [jobs, setJobs] = useState<Job[]>([]);

	useEffect(() => {
		getJobs();
	}, []);

	const getJobs = async () => {
		const docs = await retrieveJobs(category);
		setJobs(docs);
	};

	return (
		<div className="bg-digi_background">
			<Header />
			<Banner />
			<div className="max-w-screen-lg mx-auto py-5">
				{jobs.length > 0 ? (
					jobs.map((job) => (
						<JobCard key={job.id} title={job.title} id={job.id} category={job.category} />
					))
				) : (
					<h3>No Jobs Here</h3>
				)}
			</div>
		</div>
	);
};

export default Feed;
