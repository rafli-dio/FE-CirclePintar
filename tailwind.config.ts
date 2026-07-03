// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'circle-green': '#1AB0B0', // Hijau utama CirclePintar
        'circle-green-dark': '#168A8A', // Hijau lebih gelap untuk hover
        'circle-black': '#121212', // Hitam untuk teks judul
        'circle-gray': '#71717A', // Abu-abu untuk teks deskripsi
        'circle-white': '#FFFFFF', // Putih untuk latar belakang
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'], // Gunakan font yang sesuai desain
      },
    },
  },
  plugins: [],
};
export default config;