/** @type {import('tailwindcss').Config} */
export const darkMode = "class";
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
	extend: {
		animation: {
			"bounce-slow": "softbounce 3s ease-in-out infinite",
			"mobile-slow": "mobilebounce 3s ease-in-out infinite",
		},
		keyframes: {
			softbounce: {
				"0%, 100%": { transform: "translateY(10%)" },
				"50%": { transform: "translateY(-15%)" },
			},
			mobilebounce: {
				"0%, 100%": { transform: "translateY(2%)" },
				"50%": { transform: "translateY(-2%)" },
			},
		},
		backdropBlur: {
			zs: "5.5px",
		},
		fontFamily: {
			jetBrain: ["JetBrains Mono", "monospace", "cursive"],
			heebo: ["Heebo", "sans-serif"],
		},
		colors: {
			fluo: "#92E3A9",
			alice: "#E7EFFF",
			navy: "#102C57",
			tomato: "#FE654F",
			dpink: "#9C89B8",
			sunny: "#FFC43D",
			devil: "#D7263D",
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
