import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";
import { PROJECTS_DATA } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Melhek Technologies",
  description: "Explore representative business systems and websites engineered by Melhek Technologies grouped by industry.",
};

const SECTORS = [
  { name: "Hospitality", desc: "Direct hotel reservation pages, front desk calendars, and dining digital menu screens." },
  { name: "Healthcare", desc: "Simple patient appointment calendars, optical records, and medical office schedulers." },
  { name: "Retail & Commerce", desc: "Easy barcode checkouts, automatic inventory alerts, and sales dashboard totals." },
  { name: "Professional Services", desc: "Credibility-building websites, inquiry contact forms, and client scheduling tools." },
  { name: "Community & Faith", desc: "Church homepages, live broadcasts streaming, and online tithes donation forms." },
  { name: "Fitness & Wellness", desc: "Gym member registers, entry door check-ins, and automated billing reminders." },
  { name: "Automotive", desc: "High-quality car import showcases, specs search, and inquiry routing." }
];

export default function PortfolioIndexPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--electric) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-6">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Delivered Solutions
          </p>
          <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-6 leading-tight">
            Case <span className="text-gradient">Studies.</span>
          </h1>
          <p className="text-white/50 max-w-2xl mb-20 leading-relaxed font-light">
            Explore software solutions and websites built by Melhek Technologies. To help you find relevant projects, 
            these case studies are organized by industry, highlighting the practical results, core capabilities, and reliability of each system.
          </p>

          <div className="space-y-20">
            {SECTORS.map((sector) => {
              const sectorProjects = PROJECTS_DATA.filter((p) => p.category === sector.name);
              if (sectorProjects.length === 0) return null;

              return (
                <section key={sector.name} className="space-y-8">
                  <div className="border-l-2 border-melhek-blue pl-6">
                    <h2 className="text-3xl font-syne font-bold text-white uppercase tracking-tight">
                      {sector.name}
                    </h2>
                    <p className="text-white/40 text-sm mt-1 max-w-xl font-light">
                      {sector.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {sectorProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/portfolio/${project.slug}`}
                        className="group glass rounded-2xl p-8 md:p-10 border-white/5 hover:border-melhek-blue/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest flex items-center gap-1.5">
                              Case STUDY · {project.slug}
                              {project.status && (
                                <span className="px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded text-[8px] uppercase tracking-wide">
                                  {project.status}
                                </span>
                              )}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-melhek-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>

                          <h3 className="text-2xl font-syne font-bold text-white mb-4 group-hover:text-melhek-blue transition-colors">
                            {project.name}
                          </h3>

                          <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                            {project.description}
                          </p>

                          <div className="space-y-3 font-sans text-xs border-t border-white/5 pt-6 mb-6">
                            <div>
                              <strong className="text-melhek-blue font-mono uppercase tracking-wider text-[9px] block mb-1">
                                Business Outcome:
                              </strong>
                              <span className="text-white/80 leading-relaxed font-light">
                                {project.businessOutcome}
                              </span>
                            </div>
                            <div>
                              <strong className="text-melhek-blue font-mono uppercase tracking-wider text-[9px] block mb-1">
                                Core Capability:
                              </strong>
                              <span className="text-white/80 leading-relaxed font-light">
                                {project.techCapability}
                              </span>
                            </div>
                            <div>
                              <strong className="text-melhek-blue font-mono uppercase tracking-wider text-[9px] block mb-1">
                                Reliability:
                              </strong>
                              <span className="text-white/80 leading-relaxed font-light">
                                {project.scalability}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                          {project.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-white/35 uppercase tracking-tighter"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-24 border-t border-white/10 pt-12">
            <Link href="/#portfolio" className="btn-secondary text-sm">
              Back to homepage showcase
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
