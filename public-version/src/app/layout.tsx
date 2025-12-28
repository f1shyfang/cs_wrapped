import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CS Wrapped 2025 | Your Year in Code",
  description:
    "Discover your year in code. See your GitHub stats, LeetCode progress, and coding highlights beautifully visualized - like Spotify Wrapped but for developers. No login required!",
  keywords: [
    "github",
    "wrapped",
    "developer",
    "coding",
    "statistics",
    "year in review",
    "leetcode",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
