import {
	ArrowCircleRightIcon,
	LocationMarkerIcon,
} from "@heroicons/react/solid";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Modal, Tabs } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MultiImagePreview from "../../../components/categories/MultiImagePreview";
import Banner from "../../../core/Banner";
import Header from "../../../core/Header";
import { Job } from "../../../core/job/types";
import { retrieveJob } from "../../../modules/jobs/retrieve";

const { TabPane } = Tabs;

const DetailsPage: NextPage = () => {
	const [job, setJob] = useState<Job>();
	const [showPhoneNumber, setShowPhoneNumber] = useState(false);
	const router = useRouter();

	const { details } = router.query;

	useEffect(() => {
		getJob();
	}, []);

	const getJob = async () => {
		const doc = await retrieveJob(details);
		setJob(doc);
	};

	return (
		<div className="bg-digi_background">
			<Head>
				<title>Job Details</title>
			</Head>
			<Header />
			<Banner />

			<div className="max-w-screen-lg mx-auto absolute top-3/4 left-0 right-0 ">
				<div className="flex flex-col  bg-white my-5 p-8 rounded-xl shadow-2xl">
					{/**Top Portion */}
					<div className="flex grow flex-row justify-between">
						{/** Left Div */}
						<div>
							<h5 className="text-4xl font-bold capitalize overflow-ellipsis">
								{job?.title}
							</h5>
							<h5 className="text-lg text-digi_primary tracking-wide font-bold uppercase my-2">
								{job?.kreator.name}
							</h5>
							<h5 className="text-xl flex text-center tracking-wide items-center capitalize font-extralight">
								<LocationMarkerIcon className="h-5" />{" "}
								<span>{job?.kreator.name}</span>
							</h5>
						</div>
						{/** Right Div */}
						<div className="grid grid-rows-2 grid-flow-col gap-1">
							<button
								onClick={() => setShowPhoneNumber(true)}
								className="inline-flex bg-digi_primary items-center border text-white px-2 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1"
							>
								<PhoneIcon className="h-5 mr-1" />
							</button>
							<Modal
								title="Kreator Phone Number"
								visible={showPhoneNumber}
								centered
								onOk={() => setShowPhoneNumber(false)}
								onCancel={() => setShowPhoneNumber(false)}
							>
								<p>+233501083601</p>
							</Modal>

							<button className="inline-flex bg-digi_primary items-center border text-white px-2 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1">
								<VideocamIcon className="h-5 mr-1" />
							</button>

							<button className="inline-flex bg-digi_primary items-center border text-white px-2 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1">
								<ChatIcon className="h-5 mr-1" />
							</button>

							<button className="inline-flex bg-digi_primary items-center border text-white px-2 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1">
								<EmailIcon className="h-5 mr-1" />
							</button>
						</div>
					</div>
					{/** Description */}
					<div className="my-8">
						<h5 className="font-bold text-2xl tracking-wider">Description</h5>
						<p className="text-justify">{job?.description}</p>
					</div>
					{/** Display Pane */}
					<div className="my-2">
						<Tabs defaultActiveKey="0">
							<TabPane key={0} tab={<span>Videos</span>}>
								<div className="grid gap-4 grid-cols-3 auto-rows-auto">
									<div>1</div>
									<div>1</div>
									<div>1</div>
									<div>1</div>
									<div>1</div>
									<div>1</div>
									<div>1</div>
									<div>1</div>
									<div>1</div>
									<div>1</div>
								</div>
							</TabPane>
							<TabPane key={1} tab={<span>Images</span>}>
								<MultiImagePreview />
							</TabPane>
							<TabPane key={2} tab={<span>Audio</span>}>
								<div className="grid gap-4 grid-cols-3 auto-rows-auto"></div>
							</TabPane>
						</Tabs>
					</div>
					<div className="my-5">
						<h5 className="text-4xl font-bold capitalize">creator perks</h5>
						<ul>
							<li className="flex text-xl items-center text-digi_primary font-bold capitalize my-4">
								<ArrowCircleRightIcon className="h-6 mr-2 " />
								<span>perk uno</span>
							</li>
							<li className="flex text-xl items-center text-digi_primary font-bold capitalize my-4">
								<ArrowCircleRightIcon className="h-6 mr-2 " />
								<span>perk uno</span>
							</li>
							<li className="flex text-xl items-center text-digi_primary font-bold capitalize my-4">
								<ArrowCircleRightIcon className="h-6 mr-2 " />
								<span>perk uno</span>
							</li>
							<li className="flex text-xl items-center text-digi_primary font-bold capitalize my-4">
								<ArrowCircleRightIcon className="h-6 mr-2 " />
								<span>perk uno</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailsPage;
