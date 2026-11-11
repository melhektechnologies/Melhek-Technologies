import type { Metadata } from "next";
import { Clock3, ShieldCheck } from "lucide-react";
import AuthGate from "@/app/pricing/components/AuthGate";
import AgreementDocument from "@/components/commercial-documents/AgreementDocument";
import { hasCommercialDocsAccess, isCommercialDocsAuthConfigured } from "@/lib/pricing/auth";
import { AGREEMENT_ID, AGREEMENT_VERSION } from "@/lib/commercial-documents/agreement";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Commercial Documents | Melhek Technologies",
  description: "Private workspace for Melhek commercial documents.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noarchive: true } },
};

const highlights = [
  { value: "10%", label: "Referral commission", note: "Eligible collected implementation fees" },
  { value: "5 days", label: "Referral response", note: "After a complete submission" },
  { value: "180 days", label: "Project protection", note: "From written acceptance" },
  { value: "10 days", label: "Commission payment", note: "After eligible funds clear" },
];

function AgreementWorkspace() {
  return (
    <main data-commercial-documents-route className="relative min-h-screen overflow-hidden bg-melhek-navy text-white">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-52 h-[34rem] w-[34rem] rounded-full bg-melhek-blue/[0.09] blur-[140px]" />
        <div className="absolute -bottom-64 right-[-6rem] h-[36rem] w-[36rem] rounded-full bg-cyan-400/[0.045] blur-[150px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-melhek-navy/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-2.5 px-4 sm:px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-melhek-blue/35 bg-melhek-blue/10 text-blue-200">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-extrabold tracking-tight">Melhek Technologies</span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">Internal commercial documents</span>
          </span>
        </div>
      </header>

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-24 sm:px-6 sm:pt-28">
        <section className="grid items-center gap-8 pb-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 lg:pb-10">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Owner workspace · {AGREEMENT_ID} · v{AGREEMENT_VERSION}</p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
              Referral agreement<br /><span className="text-gradient">for Kenenét Consultancy.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Private preparation copy for Melhek. The shareable signing page is maintained separately at the Kenenét agreement route.</p>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-melhek-blue/25 bg-gradient-to-br from-melhek-blue/10 via-melhek-navy/80 to-white/[0.02] p-6 sm:p-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/75">Referral commission</p>
            <p className="mt-2 font-display text-6xl font-extrabold tracking-tight">10<span className="text-gradient">%</span></p>
            <p className="mt-2 text-sm leading-6 text-white/65">On eligible implementation fees Melhek actually receives for a project accepted in writing.</p>
          </div>
        </section>

        <section aria-labelledby="agreement-highlights" className="mb-7">
          <div className="mb-3 flex items-center gap-2 px-1">
            <Clock3 className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
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

        <AgreementDocument />

        <footer className="mx-auto mt-7 flex max-w-5xl flex-col gap-2 border-t border-white/10 pt-5 text-[10px] leading-5 text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{AGREEMENT_ID} · v{AGREEMENT_VERSION}</p>
          <p>Owner workspace · Kenenét signature route: /agreements/kenenet-consultancy</p>
        </footer>
      </div>
    </main>
  );
}

export default async function CommercialDocumentsPage() {
  if (!(await hasCommercialDocsAccess())) {
    return <main data-commercial-documents-route className="min-h-screen bg-melhek-dark"><div className="relative pb-16 pt-6"><AuthGate configured={isCommercialDocsAuthConfigured()} scope="commercial-documents" /></div></main>;
  }
  return <AgreementWorkspace />;
}
