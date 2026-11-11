import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  AGREEMENT_ID,
  AGREEMENT_VERSION,
  agreementClauses,
  agreedCommercialTerms,
  partyDetails,
  type AgreementBlock,
} from "@/lib/commercial-documents/agreement";

function AgreementBlockView({ block }: { block: AgreementBlock }) {
  if (block.type === "list") {
    return (
      <ul className="my-3 space-y-2 pl-5 marker:text-blue-600">
        {block.items.map((item) => <li key={item} className="pl-1">{item}</li>)}
      </ul>
    );
  }
  if (block.type === "example") {
    return (
      <div className="my-4 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 sm:p-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-blue-800">{block.title}</p>
        <p>{block.text}</p>
      </div>
    );
  }
  return <p>{block.text}</p>;
}

export default function AgreementDocument({ includeSignatureBlocks = true }: { includeSignatureBlocks?: boolean }) {
  return (
    <article className="mx-auto max-w-5xl rounded-[1.75rem] border border-white/80 bg-white p-5 text-slate-800 shadow-[0_30px_100px_-35px_rgba(0,0,0,0.65)] sm:p-9 lg:p-12">
      <div className="mb-7 border-b border-slate-200 pb-6 sm:mb-8 sm:pb-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-light.png" alt="" aria-hidden="true" width={34} height={40} priority className="h-10 w-9 object-contain" />
            <div>
              <p className="font-display text-sm font-extrabold tracking-tight text-slate-950">Melhek Technologies</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Your digital anchor</p>
            </div>
          </div>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-blue-800">Referral agreement</span>
        </div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">Non-exclusive referral arrangement</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Referral Partnership Agreement</h2>
        <p className="mt-2 text-xs text-slate-500">{AGREEMENT_ID} · v{AGREEMENT_VERSION} · Effective on the date of the last signature</p>
      </div>

      <section aria-label="Parties" className="mb-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {partyDetails.map((party) => (
          <div key={party.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-blue-800">{party.label}</p>
            <h3 className="mt-1 font-display text-lg font-bold text-slate-950">{party.tradingName}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Represented by {party.representative}, {party.position}.</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{party.legalForm} · {party.address}<br />Notices: {party.noticeEmail}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="commercial-terms-title" className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-blue-800">The commercial foundation</p>
        <h3 id="commercial-terms-title" className="mt-1 font-display text-lg font-bold text-slate-950">Agreed commercial terms</h3>
        <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
          {agreedCommercialTerms.map((term) => <li key={term} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" /><span>{term}</span></li>)}
        </ul>
      </section>

      {agreementClauses.map((clause) => (
        <section key={clause.id} id={clause.id} className="scroll-mt-8 border-t border-slate-200 py-6 first:border-t-0 sm:py-7">
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-blue-700">{String(clause.number).padStart(2, "0")}</span>
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{clause.title}</h3>
          </div>
          <div className="space-y-3 text-sm leading-7 text-slate-700 sm:text-[0.94rem]">{clause.blocks.map((block, index) => <AgreementBlockView key={`${clause.id}-${index}`} block={block} />)}</div>
        </section>
      ))}

      <section className="mt-4 border-t-2 border-slate-900 pt-7 sm:pt-8">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-blue-800">Execution</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-slate-950">Signatures</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">This Agreement takes effect when both Parties have signed. Each Party should retain a copy of the completed Agreement.</p>
        {includeSignatureBlocks && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {partyDetails.map((party) => (
              <div key={party.label} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                <p className="font-semibold text-slate-950">For {party.tradingName}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{party.representative} · {party.position}</p>
                <div className="mt-8 border-b border-slate-400" /><p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Signature</p>
                <div className="mt-6 border-b border-slate-400" /><p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Date</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
