import type { Metadata } from "next";
import { MarketingLayout } from "@/components/MarketingLayout";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing & Timelines | Melhek Technologies",
  description: "Explore Melhek Technologies' transparent pricing models, expected project timelines, and custom estimator. Build your enterprise website, hospitality booking app, or custom operations software with Addis Ababa's premium engineering partner.",
  keywords: [
    "website development cost Ethiopia",
    "custom software pricing Addis Ababa",
    "Melhek pricing",
    "project cost calculator",
    "software development timeline",
  ],
};

export default function PricingPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-28 pb-16">
        <PricingClient />
      </main>
    </MarketingLayout>
  );
}
