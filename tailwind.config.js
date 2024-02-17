import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./pages/**/*.{html,js}',
		'./components/**/*.{html,js}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		// fontFamily: {
		// 	sans: [
		// 		'"Inter"',
		// 		'system-ui',
		// 		'-apple-system',
		// 		'BlinkMacSystemFont',
		// 		'"Segoe UI"',
		// 		'Roboto',
		// 		'"Helvetica Neue"',
		// 		'Arial',
		// 		'"Noto Sans"',
		// 		'sans-serif',
		// 		'"Apple Color Emoji"',
		// 		'"Segoe UI Emoji"',
		// 		'"Segoe UI Symbol"',
		// 		'"Noto Color Emoji"',
		// 	],
		// },
		extend: {},
	},
	darkMode: "class",
	plugins: [nextui()],
}

export default config;
