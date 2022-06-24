/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
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
			},
		},
	},
	plugins: [],
};
