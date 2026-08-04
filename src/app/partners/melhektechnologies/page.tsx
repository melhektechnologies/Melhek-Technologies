import type { Metadata } from "next";
import DigitalPartnershipPlatform from "@/app/partnership/DigitalPartnershipPlatform";

export const metadata: Metadata = {
  title: "Melhek Digital Partner Program | Invitation-Only Strategic Partnership",
  description:
    "Invitation-only strategic partnership with Melhek Technologies. Sponsored digital foundation with clear scope boundaries and growth opportunities as your business expands.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MelhekPartnershipPage() {
  return <DigitalPartnershipPlatform />;
}
