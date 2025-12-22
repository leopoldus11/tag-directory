import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/top-nav";
import { StructuredData } from "./structured-data";
import { ViewTransition } from "@/components/view-transition";
import { AuthSessionProvider } from "@/components/session-provider";
import { getBaseUrl } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "tracking.directory - Open-Source Tracking Library",
    template: "%s | tracking.directory",
  },
  description: "An open-source library for tracking scripts and recipes. Discover, share, and contribute production-ready tracking implementations for GTM, Adobe Launch, Tealium, GA4, Meta, and more.",
  keywords: [
    "tracking",
    "analytics",
    "GTM",
    "Google Tag Manager",
    "Adobe Launch",
    "Tealium",
    "GA4",
    "Meta Pixel",
    "digital analytics",
    "tracking scripts",
    "tag management",
    "open source",
  ],
  authors: [{ name: "tracking.directory" }],
  creator: "tracking.directory",
  publisher: "tracking.directory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tracking.directory",
    siteName: "tracking.directory",
    title: "tracking.directory - Open-Source Tracking Library",
    description: "An open-source library for tracking scripts and recipes. Discover, share, and contribute production-ready tracking implementations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "tracking.directory - Open-Source Tracking Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tracking.directory - Open-Source Tracking Library",
    description: "An open-source library for tracking scripts and recipes",
    creator: "@tagdirectory",
    images: ["/og-image.png"],
  },
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
  alternates: {
    canonical: "https://tracking.directory",
  },
  verification: {
    // Add when you have verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <ViewTransition>
            <TopNav />
            {children}
          </ViewTransition>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
