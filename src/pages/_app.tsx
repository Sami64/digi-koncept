import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	// const initCometChat = async () => {
	// 	const appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
	// 		.subscribePresenceForAllUsers()
	// 		.setRegion(process.env.COMET_REGION)
	// 		.autoEstablishSocketConnection(true)
	// 		.build();

	// 	const initResult = await CometChat.init(
	// 		process.env.COMET_APP_ID,
	// 		appSetting
	// 	);
	// 	console.log("Comet Initialization", initResult);
	// };

	// initCometChat();

	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />;
		</SessionProvider>
	);
}

export default MyApp;
