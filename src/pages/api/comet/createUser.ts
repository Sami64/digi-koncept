import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function createCometUser(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession();
	console.log(session);
	res.status(200).json({ session });
}
