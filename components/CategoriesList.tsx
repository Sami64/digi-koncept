import type { NextPage } from "next";
import React from "react";
import CategoryCard from "./CategoryCard";

const CategoriesList: NextPage = () => {
	return (
		<div className="mt-10 justify-center flex flex-col items-center">
			<h1 className="text-4xl capitalize text-center">choose a category</h1>
			<div className="grid grid-flow-row-dense md:grid-cols-4 lg:grid-clos-4  mx-auto">
				{[1, 2, 3, 4, 5].map((category) => (
					<CategoryCard />
				))}
			</div>
		</div>
	);
};

export default CategoriesList;
