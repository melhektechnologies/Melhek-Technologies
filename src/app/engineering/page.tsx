import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "Engineering Excellence | Melhek Technologies",
  description: "How Melhek ships secure, observable, and scalable systems.",
};

export default function EngineeringPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Engineering
          </p>
          <h1 className="text-5xl md:text-6xl font-syne font-extrabold text-white mb-8 leading-tight">
            Built for <span className="text-gradient">production</span>
          </h1>
          <ul className="space-y-6 text-white/55 leading-relaxed text-lg">
            <li>
              <strong className="text-white">Architecture first:</strong> bounded contexts, clear ownership,
              and APIs that survive team changes.
            </li>
            <li>
              <strong className="text-white">Security in the loop:</strong> threat modeling for sensitive
              flows, least-privilege defaults, and audit-friendly change records.
            </li>
            <li>
              <strong className="text-white">Observability:</strong> metrics, structured logs, and tracing
              hooks so incidents are short and rare.
            </li>
            <li>
              <strong className="text-white">Velocity without chaos:</strong> CI/CD, preview environments,
              and incremental rollout patterns.
            </li>
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary text-sm">
              Talk to engineering
            </Link>
            <Link href="/portfolio" className="btn-secondary text-sm">
              See our work
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
