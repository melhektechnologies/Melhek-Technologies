import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MarketingLayout } from "@/components/MarketingLayout";
import { PROJECTS_DATA } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { IconMap, IconType } from "@/lib/icons";

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
                        className="group flex flex-col h-full"
                      >
                        <div
                          className="glass rounded-[2rem] border-white/5 hover:border-melhek-blue/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full overflow-hidden"
                        >
                          {/* Browser Mockup Header/Frame */}
                          <div className="relative border-b border-white/10 overflow-hidden bg-melhek-dark">
                            {/* Browser top bar */}
                            <div className="h-8 bg-black/60 backdrop-blur-sm border-b border-white/5 flex items-center px-4 gap-1.5 relative z-10">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                              <span className="ml-3 text-[9px] font-mono text-white/35 uppercase tracking-widest truncate max-w-[150px]">
                                melhek.tech / {project.slug}
                              </span>
                              {project.status && (
                                <span className="ml-auto px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded text-[8px] uppercase tracking-wide font-mono">
                                  {project.status}
                                </span>
                              )}
                            </div>
                            
                            {/* Content viewport */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-melhek-navy">
                              {project.image ? (
                                <Image
                                  src={project.image}
                                  alt={`${project.name} preview`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center p-6`}>
                                  <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 p-4 flex flex-col gap-3">
                                    <div className="h-3 w-3/4 bg-white/10 rounded-full" />
                                    <div className="h-2.5 w-1/2 bg-white/5 rounded-full" />
                                    <div className="flex-1 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center text-melhek-blue opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700">
                                      {IconMap[project.iconName as IconType]}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* Light glow overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                            </div>
                          </div>

                          {/* Card details body */}
                          <div className="p-8 flex flex-col justify-between flex-1">
                            <div>
                              <span className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest block mb-2">
                                Case STUDY
                              </span>

                              <h3 className="text-2xl font-syne font-bold text-white mb-4 group-hover:text-melhek-blue transition-colors">
                                {project.name}
                              </h3>

                              <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                                {project.description}
                              </p>

                              {/* Outcome parameters */}
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
                                    Reliability & Scale:
                                  </strong>
                                  <span className="text-white/80 leading-relaxed font-light">
                                    {project.scalability}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Tags footer */}
                            <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5 items-center justify-between">
                              <div className="flex flex-wrap gap-1.5">
                                {project.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-white/35 uppercase tracking-tighter"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs font-mono font-bold text-melhek-blue group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
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
