import "@fortawesome/fontawesome-free/css/all.min.css"
import "antd/dist/antd.css"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "../styles/globals.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />;
		</SessionProvider>
	)
}

export default MyApp
