/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({ dest: "public" })
module.exports =withPWA({
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
	},
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
		domains: [
			"links.papareact.com",
			"images.unsplash.com",
			"unsplash.com",
			"res.cloudinary.com",
			"lh3.googleusercontent.com",
		],
	},
	webpack: (config, options) => {
		const { isServer } = options
		config.module.rules.push({
			test: /\.(wav|mp3|ogg|mpe?g|png|jpe?g|gif|svg)$/i,
			exclude: config.exclude,
			use: [
				{
					loader: require.resolve("file-loader"),
					options: {
						limit: 10000,
						fallback: require.resolve("url-loader"),
						publicPath: `_next/static/images/`,
						outputPath: `${isServer ? "../" : ""}static/images/`,
						name: "[name]-[hash].[ext]",
						esModule: config.esModule || false,
					},
				},
			],
		})
		return config
	},
	env: {
		NEXT_PUBLIC_VERCEL_MAPBOX_GL_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_VERCEL_MAPBOX_GL_ACCESS_TOKEN,
		NEXT_PUBLIC_VERCEL_CHATENGINE_ID:
			process.env.NEXT_PUBLIC_VERCEL_CHATENGINE_ID,
		NEXT_PUBLIC_VERCEL_CHATENGINE_KEY:
			process.env.NEXT_PUBLIC_VERCEL_CHATENGINE_KEY,
	},
})
