import { CometChat } from "@cometchat-pro/chat";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import constants from "../core/utils/comet_constants";
import { CometChatUI } from "../pages/cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/index";

const CometChatNoSSR = () => {
	const { data: session, status } = useSession();

	const initCometChat = async () => {
		const appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
			.subscribePresenceForAllUsers()
			.setRegion(constants.REGION)
			.autoEstablishSocketConnection(true)
			.build();

		const initResult = await CometChat.init(constants.APP_ID, appSetting);
		console.log("Comet Initialization", initResult);
	};

	const cometLogin = async () => {
		try {
			const user = await CometChat.login(session?.userId, constants.AUTH_KEY);
			console.log("Comet Login user", user);
		} catch (error) {
			console.log("comet login error", error);
		}
	};

	useEffect(() => {
		initCometChat();
		cometLogin();
	}, []);

	return (
		<div className=" w-screen h-screen">
			<CometChatUI />
		</div>
	);
};

export default CometChatNoSSR;
