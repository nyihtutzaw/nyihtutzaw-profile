import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        primary: token('primary'),
        'primary-fg': token('primary-fg'),
        accent: token('accent'),
        success: token('success'),
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
