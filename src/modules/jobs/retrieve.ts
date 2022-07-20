import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { Job } from "../../core/job/types";

const jobsCollection = collection(db, "jobs");

export const retrieveJobs = async (categoryId: string) => {
	let jobs: Job[] = [];
	const jobsQuery = query(jobsCollection, where("category", "==", categoryId));

	const jobSnapshot = await getDocs(jobsQuery);
	jobSnapshot.forEach((job) => {
        jobs.push()
    });

	return jobs;
};
