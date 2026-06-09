import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ShieldCheck, Zap, Layers, Smartphone, Eye, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Excellence | Melhek Technologies",
  description: "Learn about the six core engineering principles that drive Melhek's digital infrastructure systems.",
};

export default function EngineeringPage() {
  const principles = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-melhek-blue" />,
      title: "Security First",
      desc: "Security is embedded into every development phase. We enforce role-based access policies, isolate database layers, and write secure authentication systems to protect client data assets.",
      detail: "All configurations follow OWASP specifications, utilizing tokenization for API connections and AES-256 for persistent database storage."
    },
    {
      icon: <Zap className="w-8 h-8 text-melhek-blue" />,
      title: "Performance Driven",
      desc: "Speed directly impacts user interaction and compute costs. We structure systems using static-first rendering, local caching layers, and database indices to achieve sub-second execution speeds.",
      detail: "We target sub-100ms time-to-first-byte (TTFB) and leverage global CDN edge networks for asset delivery."
    },
    {
      icon: <Layers className="w-8 h-8 text-melhek-blue" />,
      title: "Scalable Architecture",
      desc: "We build systems prepared to handle growth. By utilizing stateless layers, clean boundary contexts, and microservice separations, systems scale without increased complexity.",
      detail: "Supports serverless autoscaling and stateless container orchestration for predictable horizontal scaling."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-melhek-blue" />,
      title: "Mobile First",
      desc: "Operations in emerging markets run primarily on mobile devices. We develop lightweight, mobile-optimized interfaces that load fast even over unstable mobile data connections.",
      detail: "Optimized bundle sizes, offline-resilient local caches, and responsive layouts designed for cell networks."
    },
    {
      icon: <Eye className="w-8 h-8 text-melhek-blue" />,
      title: "Future Ready Systems",
      desc: "We protect codebases from architectural rot. By adopting strict TypeScript types, comprehensive unit testing, and modular designs, codebases remain easy to refactor.",
      detail: "Enforces 90%+ type coverage, structured API contracts, and fully automated deployment checks."
    },
    {
      icon: <Award className="w-8 h-8 text-melhek-blue" />,
      title: "Business Focused Design",
      desc: "We design software to achieve operational outcomes. Every database schema, background worker, and UI module is engineered to optimize workflows and reduce cost.",
      detail: "Translating business indicators into code parameters to deliver concrete operational ROI."
    }
  ];

  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        {/* Background mesh grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(127,169,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(127,169,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Engineering Standards
          </p>
          <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-10 leading-tight">
            Built for <span className="text-gradient">Production.</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed font-light mb-16">
            Melhek Technologies constructs software systems adhering to rigid engineering protocols. 
            We replace custom, fragile scripts with structured, observable, and hardened infrastructure 
            designed to run continuously and securely.
          </p>

          <div className="space-y-12">
            {principles.map((pr, i) => (
              <div key={pr.title} className="glass p-8 rounded-2xl border-white/5 flex flex-col md:flex-row gap-6 items-start hover:border-melhek-blue/25 transition-all">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl shrink-0">
                  {pr.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-syne font-bold text-white flex items-center gap-3">
                    <span className="text-xs font-mono text-melhek-blue/50">0{i + 1} /</span>
                    {pr.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed font-light">
                    {pr.desc}
                  </p>
                  <div className="text-xs font-mono text-melhek-blue/70 pt-2 uppercase tracking-wider">
                    Metrics: {pr.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-10">
            <Link href="/contact" className="btn-primary text-sm">
              Discuss your architecture
            </Link>
            <Link href="/portfolio" className="btn-secondary text-sm">
              See delivered platforms
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
