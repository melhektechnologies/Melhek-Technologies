import type { Metadata } from "next";
import { MarketingLayout } from "@/components/MarketingLayout";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About | Melhek Technologies",
  description: "The origin story, philosophy, and future vision of Melhek Technologies — a digital anchor for businesses navigating an increasingly complex world.",
};

export default function AboutPage() {
  return (
    <MarketingLayout>
      <AboutPageClient />
    </MarketingLayout>
  );
}
