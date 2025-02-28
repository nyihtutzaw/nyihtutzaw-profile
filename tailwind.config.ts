import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      colors: {
        myColor: {
          "50": "#e8e8f4",
          "100": "#d0d1ea",
          "200": "#a2a3d4",
          "300": "#7374bf",
          "400": "#4546a9",
          "500": "#161894",
          "600": "#121376",
          "700": "#0d0e59",
          "800": "#090a3b",
          "900": "#04051e"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
