import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/providers/LanguageProvider";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

const BASE_URL = "https://ondassyn.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ondassyn Abdrakhmanov — Frontend Engineer",
    template: "%s | Ondassyn Abdrakhmanov",
  },
  description:
    "Turning complex problems into elegant, high-performance interfaces. Frontend Engineer specializing in React, Next.js, and motion design.",
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "UI Development",
    "Web Performance",
    "Motion Design",
    "Ondassyn Abdrakhmanov",
  ],
  authors: [{ name: "Ondassyn Abdrakhmanov", url: BASE_URL }],
  creator: "Ondassyn Abdrakhmanov",

  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Ondassyn Abdrakhmanov — Frontend Engineer",
    description:
      "Turning complex problems into elegant, high-performance interfaces.",
    siteName: "Ondassyn Abdrakhmanov",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ondassyn Abdrakhmanov — Frontend Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ondassyn Abdrakhmanov — Frontend Engineer",
    description:
      "Turning complex problems into elegant, high-performance interfaces.",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: "/icon.svg",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
