import type { Metadata } from "next";
import { MarketingLayout } from "@/components/MarketingLayout";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Project Blueprints & Timelines | Melhek Technologies",
  description: "Explore Melhek Technologies' expected execution timelines, custom system estimators, and technical architectures. Build your custom enterprise system with Addis Ababa's premium engineering partner.",
  keywords: [
    "website development timeline Ethiopia",
    "custom software development Addis Ababa",
    "Melhek timelines",
    "project scope estimator",
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
