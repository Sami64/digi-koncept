import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import constants from "../../../../core/utils/comet_constants";

export default async function addFriend(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const uid = req.body.uid.replaceAll(" ", "");

		const { data, status } = await axios.post(
			`https://${constants.APP_ID}.api-${constants.REGION}.cometchat.io/v3/users/${req.body.userId}/friends`,
			{ accepted: [uid] },
			{
				headers: {
					"Content-Type": "application/json",
					apiKey: constants.API_KEY,
					Accept: "application/json",
				},
			}
		);

		if (status == 200) {
			const response = await axios.post(
				`https://${constants.APP_ID}.api-${constants.REGION}.cometchat.io/v3/messages`,
				{
					receiver: uid,
					receiverType: "user",
					category: "message",
					type: "text",
					data: {
						text: `Hello, ${req.body.kreatorName}\nI am interested in your job \"${req.body.kreatorJob}\"`,
					},
				},
				{
					headers: {
						"Content-Type": "application/json",
						apiKey: constants.API_KEY,
						Accept: "application/json",
						onBehalfOf: req.body.userId,
					},
				}
			);
			if (response.status == 200)
				return res.status(200).json({ message: "OK" });
		}
	} catch (error: any) {
		return res.status(error.statusCode || 500).json({ error: error.message });
	}
}
