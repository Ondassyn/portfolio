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
    // Lead with Software Engineer to broaden your reach
    default: "Ondassyn Abdrakhmanov — Senior Software Engineer",
    template: "%s | Ondassyn Abdrakhmanov",
  },
  description:
    "MSc in Computer Science specializing in high-scale systems and high-performance interfaces. Building full-stack solutions with React, Next.js, and Node.js.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer", // Crucial for SEO now
    "System Architecture",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Web Performance",
    "Motion Design",
    "Ondassyn Abdrakhmanov",
  ],
  authors: [{ name: "Ondassyn Abdrakhmanov", url: BASE_URL }],
  creator: "Ondassyn Abdrakhmanov",

  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Ondassyn Abdrakhmanov — Senior Software Engineer",
    description:
      "Bridging the gap between complex system architecture and elegant user experiences.",
    siteName: "Ondassyn Abdrakhmanov",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ondassyn Abdrakhmanov — Senior Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ondassyn Abdrakhmanov — Senior Software Engineer",
    description:
      "Software Engineer & MSc CS. Specialized in scalable architectures and interactive web experiences.",
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
