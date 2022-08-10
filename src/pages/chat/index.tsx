import { useSession } from "next-auth/react";
import { ChatEngine } from "nextjs-chat-engine";
import { useEffect, useState } from "react";

// const ChatEngine = dynamic(() =>
// 	import("nextjs-chat-engine").then((module) => module.ChatEngine)
// );

// const ChatEngine = dynamic(() =>
// 	import("react-chat-engine").then((module) => module.ChatEngine)
// );

const Chat = () => {
	const { data: session, status } = useSession();
	const [showChat, setShowChat] = useState(false);

	useEffect(() => {
		if (typeof document !== undefined) {
			setShowChat(true);
		}
	}, []);

	function renderChatForm(creds: any) {
		return (
			<div>
				<input
					placeholder="Username"
					id="new-dc-user"
					//value={username}
					//onChange={(e) => setUsername(e.target.value)}
				/>
				<button id="new-dc-user-btn" onClick={() => {}}>
					Create
				</button>
			</div>
		);
	}

	if (!showChat) return <div></div>;

	return (
		<div>
			{showChat && (
				<ChatEngine
					height="100vh"
					userName={session?.user?.name}
					userSecret={session?.userId}
					publicKey={process.env.NEXT_PUBLIC_VERCEL_CHATENGINE_ID}
				/>
			)}
		</div>
	);
};

export default Chat;
