import { NextPage } from "next";
import JobCard from "../../../components/job/JobCard";
import Banner from "../../../core/Banner";
import Header from "../../../core/Header";

const Feed: NextPage = () => {
	return (
		<div className="bg-digi_background">
			<Header />
			<Banner />
			<div className="max-w-screen-lg mx-auto">
				<JobCard />
				<JobCard />
				<JobCard />
				<JobCard />
				<JobCard />
				<JobCard />
				<JobCard />
			</div>
		</div>
	);
};

export default Feed;
