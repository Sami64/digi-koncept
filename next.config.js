/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	images: {
		disableStaticImages: true,
		domains: ["links.papareact.com", "images.unsplash.com"],
	},
	webpack5: true,
	webpack: (config, options) => {
		const { isServer } = options;
		config.module.rules.push({
			test: /\.(ogg|mp3|wav|mpeg|png|jpeg|gif|svg)$/i,
			exclude: config.exclude,
			use: [
				{
					loader: require.resolve("file-loader"),
					options: {
						limit: config.inlineImageLimit,
						publicPath: `_next/static/images/`,
						outputPath: `${isServer ? "../" : ""}static/images/`,
						name: "[name]-[hash].[ext]",
						esModule: config.esModule || false,
					},
				},
			],
		});
		return config;
	},
	env: {
		NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
	},
};
