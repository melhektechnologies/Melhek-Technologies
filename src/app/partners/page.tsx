import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Agency Partner Program | Melhek Technologies",
  description:
    "White-label engineering and strategic referral for marketing agencies. Offer premium web, software, and AI under your brand — or refer clients and earn commission.",
  keywords: [
    "white label software development Ethiopia",
    "agency development partner Addis Ababa",
    "outsource web development",
    "B2B software partner",
    "white label systems integration",
  ],
};

export default function PartnersPage() {
  return <PartnersClient />;
}
