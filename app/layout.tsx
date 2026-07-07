// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const fredoka = Fredoka({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Circle Pintar - Belajar Lebih Seru, Pintar Lebih Cepat!",
  description: "Platform belajar interaktif dan lengkap untuk siswa Indonesia. Mulai dari course, ringkasan, latihan soal, latihan coding, dan kuis seru!",
  keywords: "belajar online, platform pendidikan, course online, siswa Indonesia, circle pintar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link 
          href="https://fonts.googleapis.com/icon?family=Material+Icons" 
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${fredoka.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}