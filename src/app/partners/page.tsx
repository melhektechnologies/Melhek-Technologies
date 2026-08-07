import type { Metadata } from "next";
import { Suspense } from "react";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Agency Partner Program | Melhek Technologies",
  description:
    "White-label engineering and strategic referral for marketing agencies. Fixed wholesale costs, NDAs, IP transfer, and 10% referral commission — Melhek builds, you keep the client relationship.",
  keywords: [
    "white label software development Ethiopia",
    "agency development partner Addis Ababa",
    "outsource web development Ethiopia",
    "B2B software partner",
    "Melhek Agency Partner Program",
  ],
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Agency Partner Program | Melhek Technologies",
    description:
      "Sell premium web, software, and AI under your brand — or refer clients and earn commission.",
    url: "https://melhek.tech/partners",
    type: "website",
  },
};

export default function PartnersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-melhek-dark flex items-center justify-center">
          <div className="text-[11px] font-mono uppercase tracking-widest text-melhek-blue">
            Loading partner program…
          </div>
        </div>
      }
    >
      <PartnersClient />
    </Suspense>
  );
}
