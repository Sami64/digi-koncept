import { EyeIcon, UserIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { useRouter } from "next/router"
import { Category } from "../../core/categories/types"

type Props = {
	id: string
	title: string
	category: Category
	kreatorName: string
	images: string[]
}

const JobCard: React.FC<Props> = ({
	id,
	title,
	category,
	kreatorName,
	images,
}) => {
	const router = useRouter()

	return (
		<div className="flex md:flex-row bg-white justify-between my-2 p-8 rounded-lg shadow-lg flex-col">
			<div className="bg-slate-100 rounded-lg py-2 flex justify-center items-center relative h-48 w-52 ">
				<Image
					src={images[0]}
					layout="fill"
					objectFit="cover"
					className=" cursor-pointer rounded-lg"
				/>
			</div>
			<div className="flex flex-col text-left grow mx-5">
				<h3 className="font-semibold text-2xl capitalize">{title}</h3>
				<h5 className="flex text-lg font-normal items-center text-gray-600">
					<UserIcon className="h-5 mr-1" />
					<span>{kreatorName}</span>
				</h5>
			</div>
			<div className="flex flex-col items-center justify-center">
				<button
					onClick={() => router.push(`/categories/${category.id}/${id}`)}
					className="inline-flex bg-digi_primary items-center border text-white px-10 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1"
				>
					<EyeIcon className="h-5 mr-1" />
					<span>View</span>
				</button>
			</div>
		</div>
	)
}

export default JobCard
