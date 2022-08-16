import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatInput from "../../components/chat/ChatInput";
import { ChatMessage } from "../../core/chat/types";
import { Kreator } from "../../core/users/types";
import {
	retrieveChatRoomMessages,
	retrieveRoomById,
} from "../../modules/chat/retrieve";
import { retrieveKreator } from "../../modules/users/retrieve";

const ChatRoom: NextPage = () => {
	const router = useRouter();
	const [roomMessages, setRoomMessages] = useState<ChatMessage[]>([]);
	const { data: session, status } = useSession();
	const [roomDetails, setRoomDetails] = useState<{ kreator: Kreator }>({
		kreator: {
			id: "",
			name: "",
			email: "",
			phone: "",
			location: { longitude: 0, latitude: 0 },
			category: { id: "", title: "" },
		},
	});
	const { room } = router.query;

	const getRoomInfo = async () => {
		let kreator: Kreator;
		const roomInfo = await retrieveRoomById(room as string);
		console.log("room info obj", roomInfo);
		if (roomInfo != null) {
			kreator = await retrieveKreator(roomInfo?.kreatorId as string);
			setRoomDetails({ kreator });
		}
	};

	useEffect(() => {
		if (room != null) {
			getRoomInfo();
		}
		retrieveChatRoomMessages(room as string, setRoomMessages);
	}, []);

	return (
		<div>
			<h1>Chat Room</h1>
			<h1>kreator: {roomDetails.kreator.name}</h1>
			{roomMessages.map((message) => (
				<div key={message.id}>
					<h1>{message.message}</h1>
				</div>
			))}
			<ChatInput roomId={room as string} userId={session?.userId as string} />
		</div>
	);
};

export default ChatRoom;
