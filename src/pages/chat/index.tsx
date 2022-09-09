import dynamic from "next/dynamic"

declare global {
	interface Window {
		CometChat?: any
	}
}

const CometChatNoSSR = dynamic(() => import("../CometChatNoSSR"), {
	ssr: false,
})

const Chat = () => {
	if (typeof window !== undefined)
		window.CometChat = require("@cometchat-pro/chat").CometChat

	return (
		<div>
			<CometChatNoSSR />
		</div>
	)
}

export default Chat
