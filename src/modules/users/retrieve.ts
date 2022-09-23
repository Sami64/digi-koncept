import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../../firebase"
import { Kreator } from "../../core/users/types"

const kreatorsCollection = collection(db, "kreators")

export const retrieveKreators = async () => {
	let kreators: Kreator[] = []
	const kreatorsSnapshot = await getDocs(kreatorsCollection)

	kreatorsSnapshot.docs.forEach((doc) =>
		kreators.push({
			id: doc.id,
			name: doc.data().name,
			phone: doc.data().phone,
			email: doc.data().email,
			image: doc.data().image,
			category: doc.data().category,
			location: doc.data().location,
		})
	)

	return kreators
}

export const retrieveKreator = async (id: string): Promise<Kreator> => {
	let kreator: Kreator = {
		id: "",
		name: "",
		email: "",
		image: "",
		phone: "",
		location: { longitude: 0, latitude: 0 },
		category: { id: "", title: "" },
	}

	const docRef = doc(collection(db, "kreators"), id)
	const snapshot = await getDoc(docRef)

	if (snapshot.exists()) {
		kreator = {
			id: snapshot.id,
			name: snapshot.data()["name"],
			email: snapshot.data()["email"],
			image: snapshot.data()["image"],
			phone: snapshot.data()["phone"],
			location: snapshot.data()["location"],
			category: snapshot.data()["category"],
		}
		return kreator
	}

	return kreator
}
