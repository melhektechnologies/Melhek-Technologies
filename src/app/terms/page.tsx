import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Melhek Technologies",
  description: "Terms governing use of Melhek Technologies websites and services.",
};

export default function TermsPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-syne font-bold text-white mb-8">Terms of Service</h1>
          <p className="text-white/50 leading-relaxed mb-6">
            By accessing Melhek Technologies websites or engaging our services, you agree to these terms.
            Specific engagements are also governed by signed statements of work or master agreements.
          </p>
          <h2 className="text-xl font-syne text-white mt-10 mb-4">Use of materials</h2>
          <p className="text-white/50 leading-relaxed mb-4">
            Content on this site is for informational purposes. You may not copy, modify, or redistribute
            our materials without written permission.
          </p>
          <h2 className="text-xl font-syne text-white mt-10 mb-4">Limitation of liability</h2>
          <p className="text-white/50 leading-relaxed mb-4">
            To the extent permitted by law, Melhek is not liable for indirect or consequential damages arising
            from use of this site. Nothing here limits liability that cannot be limited by applicable law.
          </p>
          <p className="text-white/50 leading-relaxed mb-8">
            For contractual terms on a project,{" "}
            <Link href="/contact" className="text-melhek-blue hover:underline">
              speak with our team
            </Link>
            .
          </p>
          <p className="text-white/30 text-sm">Last updated: May 2026</p>
        </article>
      </main>
    </MarketingLayout>
  );
}
