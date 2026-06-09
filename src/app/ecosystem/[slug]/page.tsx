import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Monitor, Hotel, Shield, Construction, Brain, Server } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import {
  getDivisionBySlug,
  getAllDivisionSlugs,
  type DivisionIconId,
} from "@/constants/divisions";

const ICONS: Record<DivisionIconId, ReactNode> = {
  monitor: <Monitor className="w-12 h-12" />,
  hotel: <Hotel className="w-12 h-12" />,
  shield: <Shield className="w-12 h-12" />,
  construction: <Construction className="w-12 h-12" />,
  brain: <Brain className="w-12 h-12" />,
  server: <Server className="w-12 h-12" />,
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

  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/#ecosystem"
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-melhek-blue/80 hover:text-melhek-blue transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Ecosystem
          </Link>

          <div className="font-mono text-[11px] text-white/30 font-bold tracking-widest mb-6">
            {division.id}
          </div>

          <div className="text-melhek-blue mb-8">{ICONS[division.iconId]}</div>

          <h1 className="text-[clamp(32px,5vw,56px)] font-syne font-extrabold text-white mb-4 leading-tight">
            {division.title}
          </h1>
          <p className="text-sm font-mono font-bold text-melhek-blue uppercase tracking-[0.15em] mb-10">
            {division.sub}
          </p>

          <p className="text-lg text-white/60 leading-relaxed mb-12">{division.detailIntro}</p>

          <div className="flex flex-wrap gap-2 mb-16">
            {division.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono font-bold text-white/40 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-syne font-bold text-white mb-6">Highlights</h2>
          <ul className="space-y-4 mb-16 text-white/55">
            {division.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="text-melhek-blue mt-1">·</span>
                {h}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-syne font-bold text-white mb-8">Capabilities</h2>
          <div className="space-y-10">
            {division.capabilities.map((c) => (
              <div key={c.title} className="glass rounded-2xl p-8 border-white/5">
                <h3 className="text-xl font-syne font-bold text-white mb-3">{c.title}</h3>
                <p className="text-white/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-white/10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary text-sm">
              Engage this division
            </Link>
            <Link href="/#ecosystem" className="btn-secondary text-sm">
              All divisions
            </Link>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
