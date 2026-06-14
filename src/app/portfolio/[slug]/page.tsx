import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Cpu, HardDrive } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { IconMap, IconType } from "@/lib/icons";
import InteractiveBrowserMockup from "@/components/InteractiveBrowserMockup";

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
        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--electric) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-melhek-blue/80 hover:text-melhek-blue transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </Link>

          <div className="text-[10px] font-mono text-melhek-blue uppercase tracking-widest mb-4 flex items-center gap-2">
            {project.category}
            {project.status && (
              <span className="px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded text-[8px] uppercase tracking-wide">
                {project.status}
              </span>
            )}
          </div>
          <h1 className="text-[clamp(28px,4vw,48px)] font-syne font-extrabold text-white mb-8 leading-tight">
            {project.name}
          </h1>

          {/* Interactive Browser Mockup Viewport */}
          <InteractiveBrowserMockup project={project} icon={Icon} />

          <p className="text-xl text-white/60 leading-relaxed font-light mb-12">
            {project.description}
          </p>

          {/* Capability Parameters Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass p-6 rounded-2xl border-white/5 flex flex-col justify-between hover:border-melhek-blue/20 transition-all">
              <div>
                <div className="text-melhek-blue mb-3"><CheckCircle className="w-6 h-6" /></div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">Business Outcome</h3>
                <p className="text-[13px] text-white/80 leading-relaxed font-light">{project.businessOutcome}</p>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border-white/5 flex flex-col justify-between hover:border-melhek-blue/20 transition-all">
              <div>
                <div className="text-melhek-blue mb-3"><Cpu className="w-6 h-6" /></div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">Core Capability</h3>
                <p className="text-[13px] text-white/80 leading-relaxed font-light">{project.techCapability}</p>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border-white/5 flex flex-col justify-between hover:border-melhek-blue/20 transition-all">
              <div>
                <div className="text-melhek-blue mb-3"><HardDrive className="w-6 h-6" /></div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">Reliability & Scale</h3>
                <p className="text-[13px] text-white/80 leading-relaxed font-light">{project.scalability}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-16">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono font-bold text-white/40 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>

          <section className="glass rounded-2xl p-8 border-white/5 mb-8">
            <h2 className="text-xl font-syne font-bold text-white mb-4">System Overview</h2>
            <p className="text-white/50 leading-relaxed font-light text-[15px]">
              This solution was built to help organizations streamline daily operations, improve customer service, 
              and keep data records running smoothly. We designed simple, user-friendly screens for your staff 
              and managers, and backed them with highly secure database records. To learn more about how we can build 
              a similar system for your business, reach out to our team.
            </p>
          </section>

          <section className="glass rounded-2xl p-8 border-white/5 mb-16">
            <h2 className="text-xl font-syne font-bold text-white mb-4">Our Collaborative Process</h2>
            <ul className="space-y-3 text-white/50 font-light text-[15px]">
              <li className="flex gap-2 items-start">
                <span className="text-melhek-blue mt-1.5 shrink-0">·</span>
                <div>
                  <strong>Planning:</strong> We look closely at your daily business operations to map out what features will save you the most time and simplify workflows.
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-melhek-blue mt-1.5 shrink-0">·</span>
                <div>
                  <strong>Development & Launch:</strong> We build clean, fast, and secure screens, verify them thoroughly on mobile and desktop, and help you launch them.
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-melhek-blue mt-1.5 shrink-0">·</span>
                <div>
                  <strong>Ongoing Support:</strong> We remain active partners, ensuring your software stays online, updated, and ready as your store or office expands.
                </div>
              </li>
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
