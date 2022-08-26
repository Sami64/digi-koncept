import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase"

export const createClient = async (
	userId: string,
	name: string,
	email: string
) => {
	const clientsCollection = collection(db, "clients")

	const firestoreDoc = doc(clientsCollection, userId)

	await setDoc(firestoreDoc, {
		id: userId,
		name: name,
		email: email,
	})
}
