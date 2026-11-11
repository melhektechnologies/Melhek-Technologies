import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import AgreementDocument from "@/components/commercial-documents/AgreementDocument";
import AgreementSigningForm from "@/components/commercial-documents/AgreementSigningForm";
import { AGREEMENT_ID, AGREEMENT_VERSION } from "@/lib/commercial-documents/agreement";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Kenenét Referral Partnership Agreement | Melhek Technologies",
  description: "Referral Partnership Agreement between Melhek Technologies and Kenenét Consultancy.",
  alternates: { canonical: "https://melhek.com.et/agreements/kenenet-consultancy" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noarchive: true } },
  openGraph: {
    title: "Kenenét Referral Partnership Agreement | Melhek Technologies",
    description: "A non-exclusive referral agreement prepared for Melhek Technologies and Kenenét Consultancy.",
    url: "https://melhek.com.et/agreements/kenenet-consultancy",
    siteName: "Melhek Technologies",
    type: "article",
  },
};

const highlights = [
  { value: "10%", label: "Referral commission", note: "Eligible collected implementation fees" },
  { value: "5 days", label: "Referral response", note: "After a complete submission" },
  { value: "180 days", label: "Project protection", note: "From written acceptance" },
  { value: "10 days", label: "Commission payment", note: "After eligible funds clear" },
];

export default function KenenetAgreementPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-melhek-navy text-white">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-52 h-[34rem] w-[34rem] rounded-full bg-melhek-blue/[0.09] blur-[140px]" />
        <div className="absolute -bottom-64 right-[-6rem] h-[36rem] w-[36rem] rounded-full bg-cyan-400/[0.045] blur-[150px]" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-melhek-navy/85 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-melhek-blue/35 bg-melhek-blue/10 text-blue-200"><span className="font-display text-lg font-extrabold">M</span></span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold tracking-tight">Melhek Technologies</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">Referral partnership</span>
            </span>
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-white/45 sm:block">{AGREEMENT_ID} · v{AGREEMENT_VERSION}</p>
        </div>
      </header>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-9 sm:px-6 sm:pt-12">
        <section className="grid items-center gap-8 pb-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 lg:pb-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-melhek-blue/30 bg-melhek-blue/10 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-blue-200">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Prepared for Melhek Technologies and Kenenét Consultancy
            </div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Non-exclusive referral · {AGREEMENT_ID} · v{AGREEMENT_VERSION}</p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
              Clear terms.<br /><span className="text-gradient">A trusted introduction.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Kenenét introduces the opportunity. Melhek qualifies, scopes, contracts and delivers the accepted project. The agreement below records how the referral is accepted, attributed and compensated.</p>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-melhek-blue/25 bg-gradient-to-br from-melhek-blue/10 via-melhek-navy/80 to-white/[0.02] p-6 sm:p-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/75">Referral commission</p>
            <p className="mt-2 font-display text-6xl font-extrabold tracking-tight">10<span className="text-gradient">%</span></p>
            <p className="mt-2 text-sm leading-6 text-white/65">On eligible implementation fees Melhek actually receives for a project accepted in writing.</p>
            <div className="mt-5 border-t border-white/10 pt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-white/40">Project-specific · Non-exclusive · No automatic future-work commission</div>
          </div>
        </section>

        <section aria-labelledby="agreement-highlights" className="mb-7">
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" aria-hidden="true" />
            <h2 id="agreement-highlights" className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Agreement at a glance</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 sm:px-5">
                <p className="font-display text-2xl font-extrabold text-blue-200 sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs font-semibold text-white/85">{item.label}</p>
                <p className="mt-1 text-[10px] leading-4 text-white/40">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <AgreementDocument includeSignatureBlocks={false} />
        <AgreementSigningForm />

        <footer className="mx-auto mt-8 flex max-w-5xl flex-col gap-2 border-t border-white/10 pt-5 text-[10px] leading-5 text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{AGREEMENT_ID} · v{AGREEMENT_VERSION}</p>
          <p>Melhek Technologies · Kenenét Consultancy</p>
        </footer>
      </div>
    </main>
  );
}
