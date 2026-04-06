import type { Metadata } from "next";
import { Geist, Geist_Mono, Mali } from "next/font/google";
import "./globals.css";
import MusicPlayer from "./components/MusicPlayer";

// 기존 fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⭐ new font (Mali)
const mali = Mali({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mali",
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Personality Quiz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">

        {/* 🎵 Music */}
        <MusicPlayer />

        {children}
      </body>
    </html>
  );
}