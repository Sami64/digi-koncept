import { app, db } from "../../../firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { Category } from "../../core/categories/types";

const categoriesCollection = collection(db, "categories");

export const retrieveCategories = async () => {
	let categories: Category[] = [];
	const categoriesSnapshot = await getDocs(categoriesCollection);

	categoriesSnapshot.docs.map((doc) =>
		categories.push({ id: doc.id, title: doc.data()["title"] })
	);
	return categories;
};
