import type { Metadata } from "next";
import DigitalPartnershipPlatform from "./DigitalPartnershipPlatform";

export const metadata: Metadata = {
  title: "Melhek Digital Partner Program | Invitation-Only Alliance",
  description: "Enterprise-grade digital partnership platform for selected Ethiopian business creators and digital innovators. Sponsored custom digital presence engineering by Melhek Technologies.",
  keywords: [
    "Melhek Digital Partner Program",
    "Ethiopia software partnership",
    "sponsored digital presence Ethiopia",
    "B2B digital infrastructure Addis Ababa",
    "Melhek Technologies partnership"
  ],
};

export default function MelhekPartnershipPage() {
  return <DigitalPartnershipPlatform />;
}
