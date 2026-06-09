import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Anchor, Compass, Shield, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Melhek Technologies",
  description: "Learn about the mission, simple technology standards, and the anchor brand story of Melhek Technologies.",
};

export default function AboutPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        {/* Background mesh */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--electric) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Our Mission
          </p>
          <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-10 leading-[1.05]">
            Your Digital Anchor in a <br />
            <span className="text-gradient">Rapidly Evolving World.</span>
          </h1>

          <div className="space-y-12 text-white/60 leading-relaxed text-lg font-light">
            <section className="space-y-6">
              <h2 className="text-2xl font-syne font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
                The Anchor Story
              </h2>
              <p>
                In Amharic, <strong>Melhek</strong> means <strong>Anchor</strong>. This is the foundation of our entire brand. 
                An anchor represents stability, security, guidance, trust, reliability, strength, and direction. 
                Melhek exists to help businesses navigate an increasingly complex digital world through simple, stable, 
                and reliable software systems.
              </p>
              <p>
                We believe you shouldn&apos;t have to worry about your technology. Just like a ship relies on its anchor 
                to stay grounded in rough waters, your business should be able to rely on its digital systems to run without 
                errors, keep data safe, and handle daily transactions smoothly.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Anchor className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Stability & Trust</h3>
                <p className="text-sm text-white/50">Consistent business platforms built to stay online and run without errors.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Compass className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Simple Guidance</h3>
                <p className="text-sm text-white/50">Translating complex technical choices into clear, easy-to-understand solutions.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Shield className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Data Protection</h3>
                <p className="text-sm text-white/50">Keeping your business records and customer payment details safe from unauthorized access.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-melhek-blue/25 transition-all">
                <div className="text-melhek-blue mb-4"><Rocket className="w-8 h-8" /></div>
                <h3 className="text-lg font-syne font-bold text-white mb-2">Support for Growth</h3>
                <p className="text-sm text-white/50">Software layouts prepared to adapt as you open new branches or expand services.</p>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-syne font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
                Built to Deliver Outcomes
              </h2>
              <p>
                We do not build technology just for the sake of it. Every system we create is designed to solve a practical 
                business problem: saving your staff time, reducing order mistakes, attracting new customers, or streamlining 
                daily checkouts.
              </p>
              <p>
                Our vision is to build a leading African technology ecosystem that local business owners can trust. Whether you 
                are running a luxury resort, a busy medical clinic, a neighborhood supermarket, or a growing consulting firm, 
                Melhek is here to provide the stable digital foundations you need to succeed.
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
