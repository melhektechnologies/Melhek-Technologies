import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Melhek Technologies | Your Digital Anchor",
  description: "Advanced Digital Infrastructure & Intelligent Technology Solutions. Engineering the future of modern business with precision and stability.",
  keywords: ["Digital Infrastructure", "AI Systems", "Enterprise Solutions", "Technology Ecosystem", "Melhek", "Digital Anchor"],
  metadataBase: new URL("https://melhek.tech"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Melhek Technologies | Your Digital Anchor",
    description: "Engineering Intelligent Digital Infrastructure.",
    url: "https://melhek.tech",
    type: "website",
    locale: "en_US",
    siteName: "Melhek Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melhek Technologies | Your Digital Anchor",
    description: "Engineering Intelligent Digital Infrastructure.",
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
      </body>
    </html>
  );
}
