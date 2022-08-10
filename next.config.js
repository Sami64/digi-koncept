/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["links.papareact.com", "images.unsplash.com"],
	},
	env: {
		NEXT_PUBLIC_VERCEL_MAPBOX_GL_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_VERCEL_MAPBOX_GL_ACCESS_TOKEN,
	},
};
