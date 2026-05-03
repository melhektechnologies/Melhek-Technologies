import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "Security | Melhek Technologies",
  description: "Security practices and reporting at Melhek Technologies.",
};

export default function SecurityPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-syne font-bold text-white mb-8">Security Protocol</h1>
          <p className="text-white/50 leading-relaxed mb-6">
            We treat client data and production systems with high care. Our engineering process includes
            secure SDLC practices, access controls, and monitoring appropriate to each engagement.
          </p>
          <h2 className="text-xl font-syne text-white mt-10 mb-4">Reporting a concern</h2>
          <p className="text-white/50 leading-relaxed mb-4">
            If you believe you have found a security vulnerability related to Melhek services, please contact
            us with details so we can investigate promptly. Do not perform testing that harms production data
            or availability.
          </p>
          <p className="text-white/50 leading-relaxed mb-8">
            <Link href="/contact" className="text-melhek-blue hover:underline">
              Contact security / engineering
            </Link>
          </p>
          <p className="text-white/30 text-sm">Last updated: May 2026</p>
        </article>
      </main>
    </MarketingLayout>
  );
}
