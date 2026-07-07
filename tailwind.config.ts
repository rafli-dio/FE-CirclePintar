// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'circle-green': '#1BAA8A',
        'circle-green-dark': '#0D7A62',
        'circle-green-light': '#E6F7F4',
        'circle-orange': '#F97316',
        'circle-black': '#121212',
        'circle-gray': '#71717A',
        'circle-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-fredoka)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;