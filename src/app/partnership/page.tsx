import type { Metadata } from "next";
import DigitalPartnershipPlatform from "./DigitalPartnershipPlatform";

export const metadata: Metadata = {
  title: "Melhek Digital Partner Program | Invitation-Only Strategic Partnership",
  description:
    "Invitation-only strategic partnership with Melhek Technologies. Sponsored digital foundation: discovery, strategy, UI/UX, up to 5 pages, basic SEO, SSL, contact form, and *.vercel.app hosting. Growth work scoped separately.",
  keywords: [
    "Melhek Digital Partner Program",
    "strategic partnership Ethiopia",
    "sponsored website Melhek",
    "Ethiopia technology partnership",
    "Melhek Technologies",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartnershipPage() {
  return <DigitalPartnershipPlatform />;
}
