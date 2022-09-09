import dynamic from "next/dynamic"
import { useEffect } from "react"

// declare global {
// 	interface Window {
// 		CometChat?: any
// 	}
// }

const CometChatNoSSR = dynamic(() => import("../CometChatNoSSR"), {
	ssr: false,
})

const Chat = () => {
	useEffect(() => {
		if (typeof globalThis.window !== undefined)
			globalThis.window.CometChat = require("@cometchat-pro/chat").CometChat
	}, [])

	return (
		<div>
			<CometChatNoSSR />
		</div>
	)
}

export default Chat
