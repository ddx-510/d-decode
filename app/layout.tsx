import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdSenseLoader from "@/components/AdSenseLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Base64 Decode | Advanced Sci-Tech File Converter",
    template: "%s | D-Decode",
  },
  description: "D-Decode is a privacy-focused Base64 decoder tool. Convert Base64 strings to images (PNG, JPEG), PDF, audio, video, and more instantly in your browser. No server uploads.",
  keywords: ["base64 decode", "base64 to image", "base64 to pdf", "base64 converter", "base64 decoder", "decode base64 online", "file preview"],
  authors: [{ name: "D-Decode Systems" }],
  creator: "D-Decode Systems",
  publisher: "D-Decode Systems",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Base64 Decode | Advanced Sci-Tech File Converter",
    description: "Convert Base64 to files instantly. Privacy-first, browser-based decoding for developers and data analysts.",
    siteName: "D-Decode",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Decode | Advanced Sci-Tech File Converter",
    description: "Convert Base64 to files instantly. Privacy-first, browser-based decoding.",
    creator: "@d_decode",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AdSenseLoader />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-neon-cyan selection:text-black`}
      >
        {children}
      </body>
    </html >
  );
}