import {
	EyeIcon,
	LocationMarkerIcon,
	PhoneIcon,
	UserIcon,
    PhotographIcon
} from "@heroicons/react/solid";
import Image from "next/image";

const JobCard: React.FC = () => (
	<div className="flex bg-white justify-between my-2 p-8 rounded-lg shadow-lg">
		<div className="bg-slate-500 py-2 flex justify-center items-center">
			<Image
				src="https://links.papareact.com/f90"
				width={160}
				height={50}
				objectFit="contain"
				className="cursor-pointer"
			/>
		</div>
		<div className="flex flex-col text-left grow mx-5">
			<h3 className="font-semibold text-2xl">
				Jopitar looking for a senior UX Designer
			</h3>
			<h5 className="flex text-lg font-normal items-center text-gray-600">
				<UserIcon className="h-5 mr-1" />
				<span>Kreator Name</span>
			</h5>
			<h5 className="flex text-lg font-normal items-center text-gray-600">
				<LocationMarkerIcon className="h-5 mr-1" />
				<span>Kreator Location</span>
			</h5>
		</div>
		<div className="flex flex-col">
			<button className="inline-flex bg-digi_primary items-center border text-white px-10 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1">
				<EyeIcon className="h-5 mr-1" />
				<span>View</span>
			</button>
			<button className="inline-flex bg-digi_primary items-center border text-white px-10 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1">
				<PhotographIcon className="h-5 mr-1" />
				<span>Gallery</span>
			</button>
			<button className="inline-flex bg-digi_primary items-center border text-white px-10 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1">
				<PhoneIcon className="h-5 mr-1" />
				<span>Call</span>
			</button>
		</div>
	</div>
);

export default JobCard;
