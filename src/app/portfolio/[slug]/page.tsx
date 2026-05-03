import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { IconMap, IconType } from "@/lib/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return { title: "Project | Melhek Technologies" };
  return {
    title: `${p.name} | Melhek Technologies`,
    description: p.description,
  };
}

export default async function PortfolioCasePage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const Icon = IconMap[project.iconName as IconType];

  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-melhek-blue/80 hover:text-melhek-blue transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </Link>

          <div className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest mb-4">
            {project.category}
          </div>
          <h1 className="text-[clamp(28px,4vw,48px)] font-syne font-extrabold text-white mb-8 leading-tight">
            {project.name}
          </h1>

          <div
            className={`rounded-2xl border border-white/10 bg-gradient-to-br ${project.gradient} p-16 mb-12 flex items-center justify-center`}
          >
            <div className="text-melhek-blue scale-[2]" aria-hidden>
              {Icon}
            </div>
          </div>

          <p className="text-lg text-white/60 leading-relaxed mb-10">{project.description}</p>

          <section className="glass rounded-2xl p-8 border-white/5 mb-10">
            <h2 className="text-xl font-syne font-bold text-white mb-4">Overview</h2>
            <p className="text-white/50 leading-relaxed">
              This case study summarizes the product scope Melhek engineered for this industry vertical.
              In production, this page would expand with architecture notes, KPI impact, stack choices, and
              security posture—request the full brief from our team.
            </p>
          </section>

          <section className="glass rounded-2xl p-8 border-white/5 mb-16">
            <h2 className="text-xl font-syne font-bold text-white mb-4">Engagement</h2>
            <ul className="space-y-3 text-white/50">
              <li>· Discovery, UX, and technical architecture</li>
              <li>· Implementation with observability and CI/CD</li>
              <li>· Hardening, handoff, and iteration roadmap</li>
            </ul>
          </section>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary text-sm">
              Discuss a similar build
            </Link>
            <Link href="/portfolio" className="btn-secondary text-sm">
              More case studies
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
