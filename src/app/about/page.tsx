import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "About | Melhek Technologies",
  description: "Mission, pillars, and how Melhek Technologies engineers digital infrastructure.",
};

export default function AboutPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            About
          </p>
          <h1 className="text-5xl md:text-6xl font-syne font-extrabold text-white mb-8 leading-tight">
            Your <span className="text-gradient">digital anchor</span>
          </h1>
          <div className="space-y-6 text-white/55 leading-relaxed text-lg">
            <p>
              Melhek Technologies builds intelligent infrastructure for teams that cannot afford fragile
              software. We combine product discipline, security-aware engineering, and long-horizon thinking
              across five divisions—from digital platforms to hospitality, AI, secure operations, and
              physical-digital convergence.
            </p>
            <p>
              Founded with an African base and a global bar for quality, we partner with operators who need
              systems that stay fast, observable, and maintainable after launch day.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/engineering" className="btn-primary text-sm">
              Engineering standards
            </Link>
            <Link href="/#about" className="btn-secondary text-sm">
              Homepage story
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
