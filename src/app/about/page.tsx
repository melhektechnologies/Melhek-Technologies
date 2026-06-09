import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Anchor, Compass, Shield, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Melhek Technologies",
  description: "Learn about the mission, engineering philosophy, and the anchor brand story of Melhek Technologies.",
};

export default function AboutPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        {/* Background mesh */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--electric) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            About Melhek
          </p>
          <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-10 leading-[1.05]">
            Your Digital Anchor in a <br />
            <span className="text-gradient">Rapidly Evolving World.</span>
          </h1>

          <div className="space-y-12 text-white/60 leading-relaxed text-lg font-light">
            <section className="space-y-6">
              <h2 className="text-2xl font-syne font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
                The Anchor Foundation
              </h2>
              <p>
                In Amharic, <strong>Melhek</strong> means <strong>Anchor</strong>. This name defines our entire operational philosophy. 
                An anchor represents unshakeable stability, security, direction, and strength. We exist to help modern enterprises 
                navigate a complex digital landscape by establishing robust technology foundations that support long-term operational scale.
              </p>
              <p>
                As businesses undergo rapid transformation, they face fragmented software stacks, security vulnerabilities, and 
                scaling bottlenecks. Melhek acts as a reliable partner, ensuring that your digital footprint remains grounded in stability 
                while remaining agile enough to seize future opportunities.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Anchor className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Stability & Trust</h3>
                <p className="text-sm text-white/50">Systems built to handle millions of queries without degradation or downtime.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Compass className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Guidance & Clarity</h3>
                <p className="text-sm text-white/50">Translating complex operational goals into clean technical specifications and roadmaps.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Shield className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Security & Control</h3>
                <p className="text-sm text-white/50">Protecting digital assets from day one with encrypted connections and role-based policies.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Rocket className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Ecosystem Growth</h3>
                <p className="text-sm text-white/50">Consolidating digital platforms, AI labs, and secure networks into a unified partner ecosystem.</p>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-syne font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
                Why We Build
              </h2>
              <p>
                Melhek was founded to replace fragile software setups and slow-loading agency projects with clean, production-grade 
                systems. We combine systems thinking, product discipline, and advanced software engineering. We believe modern enterprises 
                deserve technology that is as reliable as physical utilities—built with clear boundaries, comprehensive logging, and 
                modular architectures.
              </p>
              <p>
                From our engineering base in Addis Ababa, we aim to establish a leading African technology ecosystem. By bridging 
                the gap between custom SaaS platforms, secure hotel automation systems, agentic analytics, and local facility networking, 
                we provide full-spectrum digital infrastructure that drives real, measurable business outcome.
              </p>
            </section>
          </div>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-10">
            <Link href="/engineering" className="btn-primary text-sm">
              Engineering standards
            </Link>
            <Link href="/contact" className="btn-secondary text-sm">
              Connect with our team
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
