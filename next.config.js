/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["links.papareact.com", "fakestoreapi.com"],
	},
	env: {
		NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
	},
};
