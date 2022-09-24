import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ChatInput from "../../components/chat/ChatInput"
import { ChatMessage } from "../../core/chat/types"
import { Kreator } from "../../core/users/types"
import {
	retrieveChatRoomMessages,
	retrieveRoomById,
} from "../../modules/chat/retrieve"
import { retrieveKreator } from "../../modules/users/retrieve"

const ChatRoom: NextPage = ({
	room,
	kreator,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	const [roomMessages, setRoomMessages] = useState<ChatMessage[]>([])
	const { data: session, status } = useSession()
	const [roomDetails, setRoomDetails] = useState<{ kreator: Kreator }>({
		kreator: {
			id: "",
			name: "",
			email: "",
			image: "",
			phone: "",
			location: { longitude: 0, latitude: 0 },
			category: { id: "", title: "" },
		},
	})

	useEffect(() => {
		if (room != null) {
			setRoomDetails({ kreator })
		}
		retrieveChatRoomMessages(room as string, setRoomMessages)
	}, [])

	return (
		<div className="flex flex-col bg-slate-800 h-screen">
			<div
				className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
				style={{
					backgroundImage: "url('/img/orange_back.png')",
				}}
			></div>
			<div className="flex relative w-3/6 mx-auto">
				<h1 className="text-xl font-bold text-white mt-5">
					{roomDetails.kreator.name}
				</h1>
			</div>
			<div className="mx-auto relative flex flex-col justify-between bg-white rounded-lg p-5 w-full md:w-3/6 my-5 h-5/6">
				{/** Message area */}
				<div className="relative flex flex-col w-full overflow-y-auto">
					{roomMessages.map((message) => (
						<div
							key={message.id}
							className={`relative flex text-lg ${
								session?.userId === message.userId ? "justify-end" : ""
							} `}
						>
							<h1 className={`flex flex-col`}>
								<span
									className={`bg-slate-300 px-3 py-2 ${
										session?.userId === message.userId
											? "rounded-tl-lg rounded-tr-lg rounded-bl-lg"
											: "rounded-tl-lg rounded-tr-lg rounded-br-lg"
									}`}
								>
									{message.message}
								</span>
								<span className="text-xs text-slate-400">
									{new Date(message?.timestamp?.toDate()).toUTCString()}
								</span>
							</h1>
						</div>
					))}
				</div>
				<ChatInput roomId={room as string} userId={session?.userId as string} />
			</div>
		</div>
	)
}

export default ChatRoom

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { room } = query
	let kreator: Kreator = {
		id: "",
		name: "",
		image: "",
		email: "",
		phone: "",
		category: { id: "", title: "" },
		location: { longitude: 0, latitude: 0 },
	}
	console.log("room", room)
	if (room != null) {
		const roomInfo = await retrieveRoomById(room as string)
		console.log("room info", roomInfo)
		if (roomInfo != null) {
			kreator = await retrieveKreator(roomInfo?.kreatorId as string)
		}
	}
	console.log("room kreator", kreator)
	return { props: { room, kreator } }
}
