import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

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
    "Discover your year in code. See your GitHub contributions, top languages, and coding highlights beautifully visualized - like Spotify Wrapped but for developers.",
  keywords: [
    "github",
    "wrapped",
    "developer",
    "coding",
    "statistics",
    "year in review",
  ],
  openGraph: {
    title: "CS Wrapped 2025",
    description: "Your year in code, beautifully visualized",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CS Wrapped 2025",
    description: "Your year in code, beautifully visualized",
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
