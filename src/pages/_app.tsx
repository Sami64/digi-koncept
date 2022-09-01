import "@fortawesome/fontawesome-free/css/all.min.css"
import "antd/dist/antd.css"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import Router from "next/router"
import "../styles/globals.css"

import ProgressBar from "@badrap/bar-of-progress"

const progress = new ProgressBar({
	size: 4,
	color: "#fefefe",
	className: "z-50",
	delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />;
		</SessionProvider>
	)
}

export default MyApp
