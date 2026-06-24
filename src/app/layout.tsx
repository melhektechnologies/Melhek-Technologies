import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AiAssistant from "@/components/AiAssistant";
import TerminalConsole from "@/components/TerminalConsole";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ['300', '400', '500', '600', '700', '800'],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Melhek Technologies | Website Development, AI Systems & Digital Transformation in Ethiopia",
  description: "Melhek Technologies is Addis Ababa's leading tech company — providing Website Development, AI Systems, Business Automation, Hotel Technology, and Digital Transformation Services. Your Digital Anchor.",
  keywords: [
    "website development Ethiopia",
    "AI systems Addis Ababa",
    "business automation Ethiopia",
    "hotel technology Ethiopia",
    "digital transformation Addis Ababa",
    "tech company Ethiopia",
    "Melhek Technologies",
    "software development Ethiopia",
    "best tech company Addis Ababa",
  ],
  metadataBase: new URL("https://melhek.tech"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Melhek Technologies | Ethiopia's Digital Anchor",
    description: "Website Development, AI Systems, Business Automation & Hotel Technology for Ethiopian businesses.",
    url: "https://melhek.tech",
    type: "website",
    locale: "en_US",
    siteName: "Melhek Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melhek Technologies | Ethiopia's Digital Anchor",
    description: "Website Development, AI Systems, Business Automation & Hotel Technology for Ethiopian businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased selection:bg-melhek-blue/30`}
      >
        {children}
        <AiAssistant />
        <TerminalConsole />
      </body>
    </html>
  );
}
