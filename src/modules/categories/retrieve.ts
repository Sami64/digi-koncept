import { app, db } from "../../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Category } from "../../core/categories/types";

const categoriesCollection = collection(db, "categories");

export const retrieveCategories = async () => {
	let categories: Category[] = [];
	const categoriesSnapshot = await getDocs(categoriesCollection);

	categoriesSnapshot.docs.forEach((doc) =>
		categories.push({ id: doc.id, title: doc.data()["title"] })
	);
	return categories;
};

export const retrieveCategory = async (categoryId: string) => {
	let category: Category;
	const docRef = doc(categoriesCollection, categoryId);
	const snapshot = await getDoc(docRef);

	if (snapshot.exists()) {
		category = {
			id: snapshot.id,
			title: snapshot.data()["title"],
		};

		return category;
	}
};
