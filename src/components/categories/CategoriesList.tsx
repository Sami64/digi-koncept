import React from "react"
import { Category } from "../../core/categories/types"
import CategoryCard from "./CategoryCard"

type Props = {
	categories: Category[]
}

const CategoriesList: React.FC<Props> = ({ categories }) => {
	return (
		<div className="mt-10 justify-center flex flex-col items-center">
			<h1 className="text-4xl capitalize text-center">choose a category</h1>
			<div className="grid grid-cols-2 grid-flow-row-dense md:grid-cols-4 lg:grid-clos-4 sm:grid-cols-3  mx-auto">
				{categories.map((category) => (
					<CategoryCard
						key={category.id}
						categoryId={category.id}
						title={category.title}
					/>
				))}
			</div>
		</div>
	)
}

export default CategoriesList
