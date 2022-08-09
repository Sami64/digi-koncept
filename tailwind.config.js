/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/core/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"banner-image": "url('/slider1.jpg')",
			},
			colors: {
				digi_primary: {
					DEFAULT: "#f36523",
					light: "#faebe4",
				},
				digi_background: {
					DEFAULT: "#F8F8F8",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
