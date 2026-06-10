import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Monitor, Hotel, Shield,
  Construction, Brain, Server, CheckCircle2, Zap
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import {
  getDivisionBySlug,
  getAllDivisionSlugs,
  DIVISIONS,
  type DivisionIconId,
} from "@/constants/divisions";

const ICONS: Record<DivisionIconId, ReactNode> = {
  monitor: <Monitor className="w-14 h-14" />,
  hotel: <Hotel className="w-14 h-14" />,
  shield: <Shield className="w-14 h-14" />,
  construction: <Construction className="w-14 h-14" />,
  brain: <Brain className="w-14 h-14" />,
  server: <Server className="w-14 h-14" />,
};

const ICON_SM: Record<DivisionIconId, ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  hotel: <Hotel className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  construction: <Construction className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDivisionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getDivisionBySlug(slug);
  if (!d) return { title: "Division | Melhek Technologies" };
  return {
    title: `${d.title} | Melhek Technologies`,
    description: d.description,
  };
}

export default async function DivisionPage({ params }: Props) {
  const { slug } = await params;
  const division = getDivisionBySlug(slug);
  if (!division) notFound();

  // Get adjacent divisions for navigation
  const currentIndex = DIVISIONS.findIndex(d => d.slug === slug);
  const prevDivision = currentIndex > 0 ? DIVISIONS[currentIndex - 1] : null;
  const nextDivision = currentIndex < DIVISIONS.length - 1 ? DIVISIONS[currentIndex + 1] : null;

  const isFuture = division.projectSlugs.length === 0;

  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden">

        {/* ── Hero Section ── */}
        <section className="relative min-h-[60vh] flex items-end pt-40 pb-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,_rgba(1,11,61,0.9)_0%,_#050816_70%)]" />
          {/* Digital grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(127,169,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127,169,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
          {/* Large watermark icon */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 text-melhek-blue/[0.04] pointer-events-none scale-[4] hidden lg:block">
            {ICONS[division.iconId]}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <Link
              href="/#ecosystem"
              className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-melhek-blue/70 hover:text-melhek-blue transition-colors mb-10 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Ecosystem
            </Link>

            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10 max-w-5xl">
              <div className="flex-1">
                {/* Division badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-melhek-blue/10 border border-melhek-blue/20 text-[10px] font-mono font-bold text-melhek-blue uppercase tracking-widest">
                    {division.id}
                  </span>
                  {isFuture && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                      Coming Soon
                    </span>
                  )}
                  {!isFuture && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Division
                    </span>
                  )}
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-5 mb-4">
                  <div className="p-4 rounded-2xl bg-melhek-blue/10 border border-melhek-blue/20 text-melhek-blue flex-shrink-0">
                    {ICONS[division.iconId]}
                  </div>
                  <h1 className="text-[clamp(36px,5vw,64px)] font-syne font-extrabold text-white leading-none tracking-[-0.03em]">
                    {division.title}
                  </h1>
                </div>

                <p className="text-sm font-mono font-bold text-melhek-blue/70 uppercase tracking-[0.15em] mb-6">
                  {division.sub}
                </p>
                <p className="text-lg text-white/55 leading-relaxed max-w-2xl">
                  {division.detailIntro}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tags ── */}
        <section className="border-y border-white/5 bg-melhek-navy/20 py-5">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest mr-2">Focus Areas:</span>
              {division.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono font-bold text-melhek-blue/70 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-20 max-w-5xl">

          {/* ── Highlights ── */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-4 h-4 text-melhek-blue" />
              <h2 className="text-2xl font-syne font-bold text-white">What We Deliver</h2>
            </div>
            <div className="grid sm:grid-cols-1 gap-4">
              {division.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 glass rounded-2xl border-white/5 hover:border-melhek-blue/20 transition-all duration-300 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-melhek-blue flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-[15px] text-white/70 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Capabilities ── */}
          <div className="mb-20">
            <h2 className="text-2xl font-syne font-bold text-white mb-8">Core Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {division.capabilities.map((c, i) => (
                <div
                  key={c.title}
                  className="relative glass p-8 rounded-3xl border-white/5 hover:border-melhek-blue/25 transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
                >
                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-melhek-blue/5 blur-2xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-melhek-blue/10 transition-colors" />
                  {/* Step number */}
                  <div className="text-5xl font-mono font-bold text-white/[0.04] mb-4 group-hover:text-melhek-blue/[0.06] transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-syne font-bold text-white mb-3 group-hover:text-melhek-blue transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-[14px] text-white/50 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="glass rounded-3xl p-10 border-melhek-blue/15 bg-gradient-to-br from-melhek-blue/5 to-transparent mb-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-syne font-bold text-white mb-2">
                  {isFuture ? 'Join the Waitlist' : `Engage ${division.title}`}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  {isFuture
                    ? `${division.title} is in our strategic roadmap. Register your interest and we'll notify you first at launch.`
                    : `Ready to deploy ${division.title} for your business? Book a consultation with our engineering team.`
                  }
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/contact" className="btn-primary text-sm flex items-center gap-2">
                  {isFuture ? 'Register Interest' : 'Start a Consultation'} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/#ecosystem" className="btn-secondary text-sm">
                  All Divisions
                </Link>
              </div>
            </div>
          </div>

          {/* ── Division Navigation ── */}
          <div className="flex justify-between gap-4 pt-8 border-t border-white/5">
            {prevDivision ? (
              <Link
                href={`/ecosystem/${prevDivision.slug}`}
                className="flex-1 glass p-5 rounded-2xl border-white/5 hover:border-melhek-blue/20 transition-all group flex items-center gap-3"
              >
                <ArrowLeft className="w-4 h-4 text-melhek-blue/50 group-hover:text-melhek-blue group-hover:-translate-x-1 transition-all flex-shrink-0" />
                <div>
                  <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-1">Previous</div>
                  <div className="text-sm font-syne font-bold text-white/70 group-hover:text-white transition-colors">{prevDivision.title}</div>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            {nextDivision ? (
              <Link
                href={`/ecosystem/${nextDivision.slug}`}
                className="flex-1 glass p-5 rounded-2xl border-white/5 hover:border-melhek-blue/20 transition-all group flex items-center justify-end gap-3 text-right"
              >
                <div>
                  <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-1">Next Division</div>
                  <div className="text-sm font-syne font-bold text-white/70 group-hover:text-white transition-colors">{nextDivision.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-melhek-blue/50 group-hover:text-melhek-blue group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ) : <div className="flex-1" />}
          </div>

        </div>
      </main>
    </MarketingLayout>
  );
}
