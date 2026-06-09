import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ShieldCheck, Zap, Layers, Smartphone, Eye, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Excellence | Melhek Technologies",
  description: "Learn about the six development principles that ensure Melhek systems remain reliable and simple.",
};

export default function EngineeringPage() {
  const principles = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-melhek-blue" />,
      title: "Data Safety",
      desc: "We build protection into every layer. We enforce secure employee login rules, isolate database records, and secure transactions to keep your business information and customer details protected.",
      detail: "Result: Customer payment histories and files stay private and secure from day one."
    },
    {
      icon: <Zap className="w-8 h-8 text-melhek-blue" />,
      title: "Sub-Second Speed",
      desc: "Slow loading times frustrate customers and waste staff time. We optimize all website images, structure database queries cleanly, and deliver files from fast local servers.",
      detail: "Result: Pages and menus load in under a second, keeping customers happy."
    },
    {
      icon: <Layers className="w-8 h-8 text-melhek-blue" />,
      title: "Scalable Growth",
      desc: "Your software should grow as your business grows. We separate data layers so that you can add new storefront checkouts, register more staff, or log more items without slow-down.",
      detail: "Result: Your system handles customer rushes smoothly without freezing."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-melhek-blue" />,
      title: "Mobile Accessibility",
      desc: "Most people access information on their cell phones. We design lightweight, mobile-optimized pages that load quickly even on weaker mobile networks.",
      detail: "Result: Staff can coordinate inventory and customers can make bookings on any mobile phone."
    },
    {
      icon: <Eye className="w-8 h-8 text-melhek-blue" />,
      title: "Easy to Manage",
      desc: "We write clean, strictly-organized code and compile thorough documentation so your systems remain easy to update, adapt, and expand over time.",
      detail: "Result: Adding new features or modifying workflows in the future is simple and affordable."
    },
    {
      icon: <Award className="w-8 h-8 text-melhek-blue" />,
      title: "Direct Business Outcomes",
      desc: "We do not build software for its own sake. Every database calendar, button layout, and automated notification is engineered to solve a practical store or office issue.",
      detail: "Result: Concrete ROI by saving your staff hours of work and reducing checkout errors."
    }
  ];

  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        {/* Background mesh grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(127,169,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(127,169,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Our Standards
          </p>
          <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-10 leading-tight">
            Built for <span className="text-gradient">Reliability.</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed font-light mb-16">
            Melhek Technologies designs and develops systems according to strict quality standards. 
            We replace complex, unstable software setups with simple, dependable business tools 
            built to serve your staff and customers.
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
                    {pr.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-10">
            <Link href="/contact" className="btn-primary text-sm">
              Discuss your project
            </Link>
            <Link href="/portfolio" className="btn-secondary text-sm">
              See delivered work
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
