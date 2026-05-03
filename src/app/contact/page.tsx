import type { Metadata } from "next";
import { MarketingLayout } from "@/components/MarketingLayout";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | Melhek Technologies",
  description: "Reach Melhek Technologies for new engagements and partnerships.",
};

export default function ContactPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-28">
        <Contact />
      </main>
    </MarketingLayout>
  );
}
