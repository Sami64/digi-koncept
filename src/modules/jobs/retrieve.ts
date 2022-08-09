import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Job, JobLocation } from "../../core/job/types";

const jobsCollection = collection(db, "jobs");

export const retrieveJobs = async (id: string) => {
	let jobs: Job[] = [];
	const jobsQuery = query(jobsCollection, where("category.id", "==", id));

	const jobSnapshot = await getDocs(jobsQuery);
	jobSnapshot.forEach((job) => {
		jobs.push({
			id: job.id,
			title: job.data()["title"],
			kreator: job.data()["kreator"],
			description: job.data()["description"],
			category: job.data()["category"],
		});
	});

	return jobs;
};

export const retrieveJobLocations = async () => {
	const locations: JobLocation[] = [];
	const jobsLocationSnapshot = await getDocs(collection(db, "locations"));

	jobsLocationSnapshot.docs.forEach((doc) =>
		locations.push({ id: doc.id, lat: doc.data().lat, lng: doc.data().lng })
	);

	return locations;
};

export const retrieveJob = async (jobId: string) => {
	let job: Job;
	const docRef = doc(jobsCollection, jobId);
	const snapshot = await getDoc(docRef);

	if (snapshot.exists()) {
		job = {
			id: snapshot.id,
			title: snapshot.data()["title"],
			kreator: snapshot.data()["kreator"],
			description: snapshot.data()["description"],
			category: snapshot.data()["category"],
		};

		return job;
	}
};