import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebase"
import { Job } from "../../core/job/types"

const jobsCollection = collection(db, "jobs")

export const jobDetails = async (id: string) => {
	let job: Job

	const docRef = doc(jobsCollection, id)
	const snapshot = await getDoc(docRef)

	if (snapshot.exists()) {
		job = {
			id: snapshot.id,
			title: snapshot.data()["title"],
			description: snapshot.data()["description"],
			kreator: snapshot.data()["kreator"],
			category: snapshot.data()["category"],
			videos: snapshot.data()["videos"],
			audios: snapshot.data()["audios"],
			images: snapshot.data()["images"],
		}

		return job
	}
}
