import {
	ArrowCircleRightIcon,
	LocationMarkerIcon,
} from "@heroicons/react/solid";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Modal, Spin, Tabs } from "antd";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import MultiImagePreview from "../../../components/categories/MultiImagePreview";
import Header from "../../../components/Header";
import { handleValidation } from "../../../core/categories/helpers/handleValidation";
import { Job } from "../../../core/job/types";
import { retrieveJob } from "../../../modules/jobs/retrieve";

const { TabPane } = Tabs;

const EmailModal: React.FC = () => {
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleOnSubmit = async (e: any) => {
		e.preventDefault();
		setShowSuccessMessage(false);
		setShowFailureMessage(false);
		setLoading(true);

		const validationResult = handleValidation(
			"User Auth Name",
			email,
			message,
			subject
		);

		console.log("Validation Result", validationResult);

		if (validationResult.isValid) {
			const result = await fetch("/api/sendgrid", {
				body: JSON.stringify({
					email,
					subject,
					message,
					fullname: "User Auth Name",
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});

			const { error } = await result.json();
			if (error) {
				console.log(error);
				setShowFailureMessage(true);
				setLoading(false);

				return;
			}

			setShowSuccessMessage(true);
			setLoading(false);
		}
	};

	return (
		<div>
			<form
				className="flex flex-col px-8 py-8 bg-white "
				onSubmit={handleOnSubmit}
			>
				<h1 className="text-2xl font-bold ">Send an email</h1>

				{/* <label htmlFor="fullname" className="text-gray-500 font-light mt-8 ">
					Full name<span className="text-red-500 ">*</span>
				</label>
				<input
					type="text"
					name="fullname"
					className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
				/> */}

				<label htmlFor="email" className="text-gray-500 font-light mt-4 ">
					E-mail<span className="text-red-500">*</span>
				</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
				/>

				<label htmlFor="subject" className="text-gray-500 font-light mt-4 ">
					Subject<span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					name="subject"
					required
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
				/>

				<label htmlFor="message" className="text-gray-500 font-light mt-4 ">
					Message<span className="text-red-500">*</span>
				</label>
				<textarea
					name="message"
					required
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
				></textarea>
				<div className="flex flex-row items-center justify-start">
					<button
						disabled={loading}
						className=" disabled:cursor-not-allowed px-10 mt-8 py-2 bg-digi_primary text-gray-50 font-bold rounded-md w-full text-lg flex flex-row items-center justify-center hover:border-gray-600 border-2 disabled:border-0"
					>
						{!loading && "Send"}
						{loading && (
							<span className={`mx-2 backdrop-opacity-10`}>
								<Spin />
							</span>
						)}
					</button>
				</div>
			</form>
			{showSuccessMessage && (
				<h1 className="text-lg font-bold text-green-500 capitalize text-center">
					Email successfully sent 🎉{" "}
				</h1>
			)}
			{showFailureMessage && (
				<h1 className="text-lg font-bold text-red-500 capitalize text-center">
					Something went wrong 😞
				</h1>
			)}
		</div>
	);
};

const DetailsPage: NextPage = () => {
	const [job, setJob] = useState<Job>();
	const [showPhoneNumber, setShowPhoneNumber] = useState(false);
	const [showEmailModal, setShowEmailModal] = useState(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	const { details } = router.query;

	useEffect(() => {
		getJob();
	}, []);

	const getJob = async () => {
		const doc = await retrieveJob(details as string);
		setJob(doc);
	};

	const handleStartChat = async () => {
		const { status } = await axios.post("/api/comet/friends/add", {
			uid: job?.kreator?.id.toLowerCase(),
			userId: session?.userId,
			kreatorName: job?.kreator?.name,
			kreatorJob: job?.title
		});
		if (status == 200) router.push("/chat");
		else alert("Error occured");
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

							<button
								onClick={handleStartChat}
								className="inline-flex bg-digi_primary items-center border text-white px-2 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1"
							>
								<ChatIcon className="h-5 mr-1" />
							</button>

							<button
								onClick={() => setShowEmailModal(true)}
								className="inline-flex bg-digi_primary items-center border text-white px-2 py-2 rounded-lg text-lg font-bold hover:shadow-xl hover:bg-white hover:text-digi_primary hover:border-digi_primary my-1"
							>
								<EmailIcon className="h-5 mr-1" />
							</button>
							<Modal
								centered
								visible={showEmailModal}
								onOk={() => setShowEmailModal(false)}
								onCancel={() => setShowEmailModal(false)}
							>
								<EmailModal />
							</Modal>
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
