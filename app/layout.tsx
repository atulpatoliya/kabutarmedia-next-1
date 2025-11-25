import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KabutarMedia - Breaking News & Latest Updates",
  description: "Your trusted source for breaking news, in-depth analysis, and comprehensive coverage from India and around the world.",
  keywords: "news, breaking news, India news, world news, latest news, politics, business, sports, technology",
  openGraph: {
    title: "KabutarMedia - Breaking News",
    description: "Latest news and updates from India and the world",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "KabutarMedia - Breaking News",
    description: "Latest news and updates from India and the world",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
