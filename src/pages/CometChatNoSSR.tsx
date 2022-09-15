// import { CometChat } from "@cometchat-pro/chat"
// import { useSession } from "next-auth/react"
// import { useEffect } from "react"
// import constants from "../core/utils/comet_constants"
// import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/index"

import { CometChat } from "@cometchat-pro/chat"
import { getSession } from "next-auth/react"
import { Component } from "react"
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/index"
import constants from "../core/utils/comet_constants"

// const CometChatNoSSR = () => {
// 	const { data: session, status } = useSession()

// 	const initCometChat = async () => {
// 		const appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
// 			.subscribePresenceForAllUsers()
// 			.setRegion(constants.REGION)
// 			.autoEstablishSocketConnection(true)
// 			.build()

// 		const initResult = await CometChat.init(constants.APP_ID, appSetting)
// 		console.log("Comet Initialization", initResult)
// 		return initResult
// 	}

// 	const cometLogin = async () => {
// 		try {
// 			const user = await CometChat.login(session?.userId, constants.AUTH_KEY)
// 			console.log("Comet Login user", user)
// 		} catch (error) {
// 			console.log("comet login error", error)
// 		}
// 	}

// 	useEffect(() => {
// 		initCometChat().then((res) => cometLogin())
// 	}, [])

// 	return (
// 		<div className=" w-screen h-screen">
// 			<CometChatUI />
// 		</div>
// 	)
// }

// export default CometChatNoSSR
type MyProps = {}

type MyState = {
	user: any
}

export default class CometChatNoSSR extends Component<MyProps, MyState> {
	constructor(props: any) {
		super(props)
		this.state = { user: undefined }
	}

	componentDidMount(): void {
		let appSetting = new CometChat.AppSettingsBuilder()
			.subscribePresenceForAllUsers()
			.setRegion(constants.REGION)
			.build()
		CometChat.init(constants.APP_ID, appSetting).then(
			() => {
				getSession().then((session) => {
					CometChat.login(session?.userId, constants.AUTH_KEY).then(
						(user) => {
							this.setState({ user })
						},
						(error) => {
							console.log("login failed wit exception:", { error })
						}
					)
				})
			},
			(error) => {
				console.log("Initialization failed with error")
			}
		)
	}

	render() {
		if (this.state.user) {
			return (
				<div className=" w-screen h-screen">
					<CometChatUI />
				</div>
			)
		} else {
			return <div>Loading....</div>
		}
	}
}
