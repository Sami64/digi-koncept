/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			"links.papareact.com",
			"images.unsplash.com",
			"unsplash.com",
			"res.cloudinary.com",
		],
	},
	env: {
		NEXT_PUBLIC_VERCEL_MAPBOX_GL_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_VERCEL_MAPBOX_GL_ACCESS_TOKEN,
		NEXT_PUBLIC_VERCEL_CHATENGINE_ID:
			process.env.NEXT_PUBLIC_VERCEL_CHATENGINE_ID,
		NEXT_PUBLIC_VERCEL_CHATENGINE_KEY:
			process.env.NEXT_PUBLIC_VERCEL_CHATENGINE_KEY,
	},
}
