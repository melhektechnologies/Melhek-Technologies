import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";
import { PROJECTS_DATA } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio | Melhek Technologies",
  description: "Selected platforms and systems engineered by Melhek Technologies.",
};

export default function PortfolioIndexPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <div className="container mx-auto px-6">
          <p className="text-melhek-blue font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-6 leading-tight">
            Case <span className="text-gradient">studies</span>
          </h1>
          <p className="text-white/50 max-w-2xl mb-16 leading-relaxed">
            Explore representative work across hospitality, healthcare, commerce, and analytics. Each
            project links to a dedicated case overview.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS_DATA.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group glass rounded-2xl p-8 border-white/5 hover:border-melhek-blue/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest mb-2">
                  {project.category}
                </div>
                <h2 className="text-2xl font-syne font-bold text-white mb-4 group-hover:text-melhek-blue transition-colors">
                  {project.name}
                </h2>
                <p className="text-white/45 text-sm leading-relaxed mb-6">{project.description}</p>
                <span className="text-xs font-bold uppercase tracking-wider text-melhek-blue">
                  View case study →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Link href="/#portfolio" className="btn-secondary text-sm">
              Back to homepage showcase
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
