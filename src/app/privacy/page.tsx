import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Melhek Technologies",
  description: "How Melhek Technologies handles personal data.",
};

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-syne font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-white/50 leading-relaxed mb-6">
            Melhek Technologies respects your privacy. This policy describes how we collect, use, and protect
            information when you use our website or engage our services.
          </p>
          <h2 className="text-xl font-syne text-white mt-10 mb-4">Information we collect</h2>
          <p className="text-white/50 leading-relaxed mb-4">
            We may collect information you provide directly (such as name, email, and project details) and
            technical data (such as browser type and usage analytics) to operate and improve our services.
          </p>
          <h2 className="text-xl font-syne text-white mt-10 mb-4">How we use information</h2>
          <p className="text-white/50 leading-relaxed mb-4">
            We use this information to respond to inquiries, deliver services, secure our systems, and
            communicate updates relevant to your engagement.
          </p>
          <h2 className="text-xl font-syne text-white mt-10 mb-4">Contact</h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Questions about privacy?{" "}
            <Link href="/contact" className="text-melhek-blue hover:underline">
              Contact us
            </Link>
            .
          </p>
          <p className="text-white/30 text-sm">Last updated: May 2026</p>
        </article>
      </main>
    </MarketingLayout>
  );
}
