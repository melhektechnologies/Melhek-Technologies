import type { Metadata } from "next";
import Link from "next/link";
import AuthGate from "@/app/pricing/components/AuthGate";
import { hasCommercialDocsAccess, isCommercialDocsAuthConfigured } from "@/lib/pricing/auth";
import styles from "./AgreementReview.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Commercial Documents | Melhek Technologies",
  description: "Private review workspace for Melhek commercial documents.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noarchive: true },
  },
};

const clauses = [
  ["parties", "Parties"],
  ["purpose", "Purpose and relationship"],
  ["qualified-referral", "Qualified referral"],
  ["submission", "Submission and acceptance"],
  ["commission", "Commission and eligible fees"],
  ["payment", "Statements and payment"],
  ["refunds", "Refunds and non-payment"],
  ["responsibilities", "Responsibilities"],
  ["confidentiality", "Confidentiality"],
  ["non-exclusivity", "Non-exclusivity"],
  ["independent-parties", "Independent parties"],
  ["intellectual-property", "Intellectual property"],
  ["term", "Term and termination"],
  ["after-termination", "Accepted referrals after termination"],
  ["disputes", "Disputes"],
  ["governing-law", "Governing law"],
  ["amendments", "Amendments and entire agreement"],
  ["notices", "Notices"],
  ["electronic-execution", "Counterparts and electronic execution"],
] as const;

function Proposed({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.proposed} my-5 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3.5 text-[0.94rem] leading-7 text-slate-800`}>
      <p className="mb-1.5 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-amber-800">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Proposed term · confirm or revise
      </p>
      <div>{children}</div>
    </div>
  );
}

function Clause({ id, number, title, children }: { id: string; number: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${styles.clause} scroll-mt-8 border-t border-slate-200 py-8 first:border-t-0 first:pt-2`}>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-blue-700">{String(number).padStart(2, "0")}</span>
        <h2 className="font-syne text-xl font-bold tracking-tight text-slate-950">{title}</h2>
      </div>
      <div className="space-y-3 text-[0.94rem] leading-7 text-slate-700">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="my-3 space-y-2 pl-5 marker:text-blue-600">
      {items.map((item) => <li key={item} className="pl-1">{item}</li>)}
    </ul>
  );
}

function ReviewWorkspace() {
  return (
    <main className={`${styles.page} relative min-h-screen overflow-x-hidden bg-[#07111f] text-white`}>
      <div aria-hidden="true" className={`${styles.ambience} pointer-events-none fixed inset-0 overflow-hidden`}>
        <div className="absolute -top-48 left-[18%] h-[34rem] w-[34rem] rounded-full bg-blue-500/[0.08] blur-[140px]" />
        <div className="absolute -bottom-56 right-[8%] h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.05] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(160,190,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(160,190,255,.6)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className={`${styles.container} relative mx-auto max-w-[1440px] px-4 pb-20 pt-5 sm:px-7 lg:px-10`}>
        <header className={`${styles.topHeader} mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5`}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-300/10 font-syne text-sm font-extrabold text-blue-200">M</span>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">Melhek Technologies</p>
              <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.19em] text-white/40">Internal · Commercial documents</p>
            </div>
          </div>
          <Link href="/pricecalculator" className="rounded-full border border-white/10 px-3.5 py-2 text-xs font-medium text-white/65 transition hover:border-white/25 hover:text-white">
            Internal commercial desk <span aria-hidden="true" className="ml-1">↗</span>
          </Link>
        </header>

        <div className={`${styles.breadcrumbs} mb-7 flex flex-wrap items-center gap-2 text-xs text-white/40`}>
          <span>Internal platform</span><span aria-hidden="true">/</span><span>Commercial documents</span><span aria-hidden="true">/</span><span className="text-white/75">Referral agreement</span>
        </div>

        <section className={`${styles.hero} mb-9 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end`}>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-200/[0.07] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Review draft · not for signature or publication
            </div>
            <h1 className="max-w-4xl font-syne text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Referral Partnership Agreement
            </h1>
            <p className="mt-3 text-base text-white/60">Melhek Technologies <span className="px-1.5 text-white/30">/</span> Kenenét Consultancy</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">A private working draft for review. No acceptance, signature, publication, or agreement execution happens on this page.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Commercial point</span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-200">Agreed in principle</span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-white">10<span className="text-blue-200">%</span></p>
            <p className="mt-1 text-sm leading-5 text-white/55">of eligible implementation fees Melhek actually collects</p>
            <div className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-white/45">VAT, third-party software licences, hardware, and other pass-through expenses are excluded.</div>
          </div>
        </section>

        <div className={`${styles.documentMeta} mb-7 grid gap-3 sm:grid-cols-3`}>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"><p className="text-[0.64rem] font-bold uppercase tracking-[0.15em] text-white/35">Agreement ID</p><p className="mt-1 text-sm text-white/75">[To be assigned]</p></div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"><p className="text-[0.64rem] font-bold uppercase tracking-[0.15em] text-white/35">Version</p><p className="mt-1 text-sm text-white/75">1.0 · Review draft</p></div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"><p className="text-[0.64rem] font-bold uppercase tracking-[0.15em] text-white/35">Effective date</p><p className="mt-1 text-sm text-white/75">Date the last Party signs · pending</p></div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[235px_minmax(0,1fr)] xl:gap-8">
          <aside className={`${styles.contents} lg:sticky lg:top-6`}>
            <nav aria-label="Agreement contents" className="rounded-2xl border border-white/10 bg-[#0b192a]/90 p-4 backdrop-blur">
              <p className="mb-3 px-2 text-[0.65rem] font-bold uppercase tracking-[0.17em] text-white/40">On this page</p>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
                {clauses.map(([id, label], index) => (
                  <a key={id} href={`#${id}`} className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-white/55 transition hover:bg-white/[0.06] hover:text-white">
                    <span className="font-mono text-[0.62rem] text-blue-300/65">{String(index + 1).padStart(2, "0")}</span><span className="truncate">{label}</span>
                  </a>
                ))}
              </div>
              <div className="my-3 border-t border-white/10" />
              <a href="#review-notes" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-blue-200/80 transition hover:bg-white/[0.06] hover:text-blue-100">Review notes and decisions <span aria-hidden="true">↓</span></a>
            </nav>
            <div className={`${styles.reviewBoundary} mt-4 rounded-2xl border border-amber-200/15 bg-amber-100/[0.045] p-4 text-xs leading-5 text-amber-100/70`}>
              <p className="mb-1 font-semibold text-amber-100">Review boundary</p>
              Proposed items are suggestions only. Confirm or revise them before preparing an execution copy.
            </div>
          </aside>

          <article className={`${styles.paper} min-w-0 rounded-2xl bg-[#fbfcfe] px-5 py-7 text-slate-800 shadow-[0_28px_100px_rgba(0,0,0,.28)] sm:px-9 sm:py-10 lg:px-12`}>
            <div className="mb-8 border-b-2 border-slate-900 pb-6">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-blue-800">Non-exclusive referral arrangement</p>
              <h2 className="mt-2 font-syne text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Referral Partnership Agreement</h2>
              <p className="mt-2 text-sm text-slate-500">Between Melhek Technologies and Kenenét Consultancy</p>
              <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">REVIEW DRAFT — NOT FOR SIGNATURE OR PUBLICATION</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">The 10% commission and excluded cost categories are preserved as agreed in principle. Text marked <strong className="font-semibold text-amber-800">PROPOSED · CONFIRM</strong> is a suggested term for both Parties to approve or revise before execution.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-[0.63rem] font-bold uppercase tracking-[0.14em] text-slate-500">Commission</p><p className="mt-1 text-sm leading-6 text-slate-800">10% of eligible project implementation fees actually received by Melhek.</p></div>
                <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-[0.63rem] font-bold uppercase tracking-[0.14em] text-slate-500">Excluded from base</p><p className="mt-1 text-sm leading-6 text-slate-800">VAT, third-party software licences, hardware, and other pass-through expenses.</p></div>
                <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-[0.63rem] font-bold uppercase tracking-[0.14em] text-slate-500">Payment basis</p><p className="mt-1 text-sm leading-6 text-slate-800">Proportional to the corresponding eligible client payments Melhek receives.</p></div>
                <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-[0.63rem] font-bold uppercase tracking-[0.14em] text-slate-500">Referral condition</p><p className="mt-1 text-sm leading-6 text-slate-800">Each client-and-project referral must be registered and accepted in writing.</p></div>
              </div>
              <div className="mt-5 grid gap-x-6 gap-y-2 border-t border-slate-200 pt-4 text-sm sm:grid-cols-2">
                <p><span className="font-semibold text-slate-900">Agreement ID:</span> [To be assigned]</p>
                <p><span className="font-semibold text-slate-900">Version:</span> 1.0 — review draft</p>
                <p className="sm:col-span-2"><span className="font-semibold text-slate-900">Effective date:</span> The date the last Party signs</p>
              </div>
            </div>

            <Clause id="parties" number={1} title="Parties">
              <p>This Referral Partnership Agreement (the “Agreement”) is between:</p>
              <p><strong className="text-slate-950">Party A:</strong> [Full legal name of the entity operating as Melhek Technologies], operating under the name Melhek Technologies, with registered address at [address], represented by [authorized representative’s full legal name and title] (“Melhek”); and</p>
              <p><strong className="text-slate-950">Party B:</strong> [Full legal name of the entity operating as Kenenét Consultancy], operating under the name Kenenét Consultancy, with registered address at [address], represented by [authorized representative’s full legal name and title] (“Kenenét”).</p>
              <p>Each is a “Party” and together they are the “Parties.”</p>
              <p>This Agreement takes effect on the date the last Party signs it (the “Effective Date”).</p>
            </Clause>

            <Clause id="purpose" number={2} title="Purpose and nature of relationship">
              <p>This Agreement governs Kenenét’s non-exclusive referrals of prospective clients to Melhek for potential digital technology projects. A referral by Melhek to Kenenét, or commission for such a referral, requires a separate written agreement. Neither Party promises a minimum number of referrals, projects, or revenue.</p>
              <p>The word “partnership” describes this referral arrangement only. The Parties intend to create no legal partnership, joint venture, employment, franchise, or agency relationship. Each Party remains responsible for its own business, personnel, expenses, and obligations.</p>
            </Clause>

            <Clause id="qualified-referral" number={3} title="Qualified referral">
              <p>A “Qualified Referral” is a prospective client and specific project opportunity that meets all of the following conditions:</p>
              <BulletList items={["Kenenét submits it to Melhek under Clause 4.", "The client and specific project or business need are identifiable.", "The referral is made with the prospective client’s permission to share the relevant contact and project information.", "Melhek accepts the referral in writing."]} />
              <Proposed>A referral would not qualify if the same client-and-project opportunity had already been accepted from another source, or Melhek had documented substantive sales activity for that specific opportunity during the 90 days before registration. Mere prior awareness of a client would not, by itself, exclude a distinct project. An existing client may be referred for a new project if that specific project meets the requirements above and Melhek accepts it.</Proposed>
              <p>Acceptance applies only to the client and project described in the registration. It does not give Kenenét an automatic commission right over the client’s other or future work.</p>
            </Clause>

            <Clause id="submission" number={4} title="Referral submission and acceptance">
              <p>Kenenét will submit each referral to <strong className="text-slate-950">[designated Melhek email or registration form]</strong>, including:</p>
              <BulletList items={["Client or organization name.", "Contact name and business contact details, where authorized.", "Brief description of the project need.", "Date and context of the introduction.", "Confirmation that the client permitted the referral and sharing of the submitted details."]} />
              <p>Melhek will confirm receipt and either accept or reject the referral in writing. Acceptance must identify the client and project. Silence, an introduction alone, or a client’s later contact with Melhek does not constitute acceptance.</p>
              <Proposed>Melhek will respond within five business days. If more information is needed, Melhek may request it and the review period will resume when it is supplied. No commission is earned unless acceptance is in writing.</Proposed>
            </Clause>

            <Clause id="commission" number={5} title="Commission and eligible fees">
              <p>For each Qualified Referral, Kenenét’s commission is <strong className="text-slate-950">10% of the Eligible Collected Implementation Fees</strong> for the accepted project. The 10% commission rate is preserved and is not changed by this Agreement.</p>
              <p>“Eligible Collected Implementation Fees” means implementation fees that relate to the specific project accepted in writing, that Melhek has actually received in cleared funds from the client, and that remain after project discounts or credits have been applied.</p>
              <p>The commission base excludes:</p>
              <BulletList items={["VAT.", "Third-party software or subscription licences.", "Hardware.", "Other pass-through expenses charged or reimbursed at cost."]} />
              <Proposed>For an invoice containing eligible and excluded line items, a general project discount or credit that is not assigned to a particular line will be allocated proportionally across those line items. A partial client payment will be allocated proportionally across the resulting net line-item balances, unless the client’s remittance instruction identifies the allocation and Melhek records it consistently.</Proposed>
              <div className="my-5 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-blue-800">Commission example</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">If an invoice has <strong className="text-slate-950">ETB 100,000</strong> in eligible implementation fees and <strong className="text-slate-950">ETB 100,000</strong> in excluded costs, a payment of <strong className="text-slate-950">ETB 100,000</strong> is 50% of the invoice. With proportional allocation, ETB 50,000 is eligible collected fees and the commission is <strong className="text-slate-950">ETB 5,000</strong>.</p>
              </div>
              <p>The commission is calculated after discounts. No commission is due on unpaid, waived, written-off, refunded, or cancelled amounts.</p>
              <p>Commission applies only to the project scope described in the accepted registration and the client contract for that project. A separate project, renewal, recurring support or maintenance service, or later unrelated work is not commissionable unless the Parties register and accept it separately in writing. A change order is included only if Melhek expressly accepts it in writing as commissionable and identifies the fee.</p>
            </Clause>

            <Clause id="payment" number={6} title="Commission statements, payment timing, and method">
              <p>Melhek will provide a statement showing client payments received, excluded amounts, the eligible collected amount, and commission due.</p>
              <Proposed>Melhek will pay each commission within 10 business days after receiving the corresponding eligible client payment in cleared funds. If a client pays in installments, commission will be paid proportionally after each installment is received.</Proposed>
              <p>Payment will be made by [bank transfer or other agreed lawful method] to Kenenét’s nominated account. Each Party is responsible for its own tax filings. Any withholding required by law may be deducted, with applicable withholding evidence provided to Kenenét. Any VAT applicable to the commission itself will be handled as required by law and against valid tax documentation.</p>
            </Clause>

            <Clause id="refunds" number={7} title="Refunds, cancellations, and client non-payment">
              <p>No commission is due on an amount Melhek does not receive. If Melhek refunds or credits a client after paying commission on that amount, Kenenét will return the corresponding commission or allow it to be credited against future commissions.</p>
              <Proposed>Kenenét will repay or authorize the credit within 15 business days after receiving Melhek’s calculation and supporting statement. The adjustment will be limited to commission attributable to the amount actually refunded or credited. If there are no future commissions to offset, repayment will be made by bank transfer.</Proposed>
            </Clause>

            <Clause id="responsibilities" number={8} title="Responsibilities">
              <p><strong className="text-slate-950">Kenenét will:</strong></p>
              <BulletList items={["Make introductions honestly and with the client’s permission.", "Provide accurate referral information.", "Avoid promising prices, delivery dates, features, or outcomes on Melhek’s behalf.", "Not collect project payments for Melhek.", "Promptly disclose any potential conflict of interest relevant to a referral."]} />
              <p><strong className="text-slate-950">Melhek will:</strong></p>
              <BulletList items={["Decide independently whether to pursue, scope, price, contract for, or decline a referred project.", "Manage its client proposals, contracts, delivery, invoices, and collections.", "Provide commission statements for accepted referrals.", "Promptly notify Kenenét of material client payments, cancellations, or refunds affecting commission."]} />
              <p>Neither Party guarantees that a referral will become a client or that a project will be profitable.</p>
            </Clause>

            <Clause id="confidentiality" number={9} title="Confidentiality and client information">
              <p>Each Party will protect the other Party’s non-public commercial, technical, financial, and client information; use it only for this referral arrangement; and share it only with personnel or advisers who need it and are bound to protect it.</p>
              <p>These obligations do not cover information the receiving Party can show was public without breach, already lawfully known, independently developed, or lawfully received from another source.</p>
              <p>Each Party will handle personal information only for the referral purpose and in accordance with applicable Ethiopian law, including applicable lawful-basis, transparency, security, data-subject rights, and retention requirements. Kenenét will obtain the prospective client’s permission to share referral details with Melhek. On request or termination, each Party will return or securely delete the other Party’s confidential information, subject to lawful record-retention requirements.</p>
              <Proposed>Confidentiality obligations continue for three years after termination. Trade secrets remain protected for as long as they qualify as trade secrets.</Proposed>
            </Clause>

            <Clause id="non-exclusivity" number={10} title="Non-exclusivity">
              <p>Either Party may work with other referral sources, providers, and clients, including in similar fields, provided it complies with this Agreement and does not misuse the other Party’s confidential information.</p>
            </Clause>

            <Clause id="independent-parties" number={11} title="Independent contractors and no authority to bind">
              <p>Each Party acts as an independent contractor. Neither Party may make a commitment, representation, warranty, financial promise, or client contract in the other Party’s name.</p>
              <p>Neither Party may represent that it is an agent, employee, legal partner, or authorized representative of the other.</p>
            </Clause>

            <Clause id="intellectual-property" number={12} title="Intellectual property and names">
              <p>Each Party retains ownership of its names, logos, materials, software, and other intellectual property. No ownership is transferred by this Agreement.</p>
              <p>A Party may use the other Party’s name or logo in marketing only with that Party’s prior written approval. Any permission to use a logo is limited, revocable, and subject to the owner’s brand instructions.</p>
            </Clause>

            <Clause id="term" number={13} title="Term and termination">
              <Proposed>This Agreement continues for an initial term of 12 months and renews for successive 12-month periods unless either Party gives 30 days’ written notice of non-renewal.</Proposed>
              <Proposed>Either Party may terminate for convenience on 30 days’ written notice. A Party may terminate immediately for serious misconduct, unlawful conduct connected with the Agreement, or an uncured material breach. For a breach that can be remedied, the breaching Party will have 10 business days after written notice to remedy it.</Proposed>
            </Clause>

            <Clause id="after-termination" number={14} title="Accepted referrals after termination">
              <p>Termination does not cancel commission rights for a Qualified Referral accepted in writing before termination.</p>
              <Proposed>An accepted referral is protected for 120 days from Melhek’s written acceptance. The client must sign the project contract for the accepted project during that period. If so, commission remains payable on eligible installment payments Melhek later receives under that project contract, even if those payments arrive after this Agreement ends.</Proposed>
              <p>No commission is created for referrals submitted but not accepted before termination, or for new projects or unrelated work that are not separately accepted in writing.</p>
            </Clause>

            <Clause id="disputes" number={15} title="Disputes">
              <p>The Parties will first attempt to resolve a dispute through good-faith discussion between authorized representatives.</p>
              <Proposed>The Parties will allow 30 days for discussion, followed by mediation in Addis Ababa if both Parties agree. If the dispute is not resolved, either Party may refer it to a court with competent jurisdiction in Ethiopia.</Proposed>
            </Clause>

            <Clause id="governing-law" number={16} title="Governing law">
              <p>This Agreement is governed by the laws of the Federal Democratic Republic of Ethiopia.</p>
            </Clause>

            <Clause id="amendments" number={17} title="Amendments and entire agreement">
              <p>This Agreement, including any referral accepted in writing under Clause 4, records the entire agreement between the Parties about this referral arrangement and replaces prior discussions on that subject.</p>
              <p>Any amendment must be in writing and approved by authorized representatives of both Parties. If a provision is unenforceable, the remaining provisions continue to apply to the extent permitted by law.</p>
            </Clause>

            <Clause id="notices" number={18} title="Notices">
              <p>Formal notices must be sent to the addresses or business emails below, or to updated contact details later provided in writing:</p>
              <p><strong className="text-slate-950">Melhek:</strong> [notice email and physical address]</p>
              <p><strong className="text-slate-950">Kenenét:</strong> [notice email and physical address]</p>
              <p>A notice is received when delivery is confirmed or acknowledged, subject to any mandatory legal rules.</p>
            </Clause>

            <Clause id="electronic-execution" number={19} title="Counterparts and electronic execution">
              <p>The Parties may sign separate paper copies, which together form one Agreement. They may also use an electronic-signature method they mutually agree to use for this Agreement.</p>
              <p>For electronic execution, the Parties should retain the signed Agreement version, the signers’ identity and authority details, timestamps, and the signing provider’s audit record. This Agreement does not state that a checkbox or typed name alone is a qualified or reliable electronic signature.</p>
            </Clause>

            <section className="border-t border-slate-200 py-8">
              <div className="mb-4 flex items-baseline gap-3"><span className="font-mono text-xs font-semibold tracking-widest text-blue-700">—</span><h2 className="font-syne text-xl font-bold tracking-tight text-slate-950">Signature blocks · draft only</h2></div>
              <p className="mb-5 text-sm leading-6 text-slate-600">These placeholders are reproduced for review. This page does not collect signatures or execute the Agreement.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-semibold text-slate-950">For Party A — Melhek Technologies</p><p className="mt-4 text-sm leading-7 text-slate-600">Legal entity: [Full legal name]<br />Authorized representative: ____________________<br />Title: ____________________<br />Signature: ____________________<br />Date: ____________________</p></div>
                <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-semibold text-slate-950">For Party B — Kenenét Consultancy</p><p className="mt-4 text-sm leading-7 text-slate-600">Legal entity: [Full legal name]<br />Authorized representative: ____________________<br />Title: ____________________<br />Signature: ____________________<br />Date: ____________________</p></div>
              </div>
            </section>

            <section id="review-notes" className="scroll-mt-8 border-t-2 border-slate-900 pt-8">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.19em] text-blue-800">Supporting review material</p>
              <h2 className="mt-2 font-syne text-2xl font-bold tracking-tight text-slate-950">Review notes for the Parties</h2>
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-rose-800">Not operative agreement terms</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">The following summary, checklist, legal review flags, and workflow support review. They do not amend the Agreement.</p>

              <div className="mt-8">
                <h3 className="font-syne text-lg font-bold text-slate-950">Plain-language commercial summary</h3>
                <BulletList items={["Kenenét receives 10% of eligible implementation fees Melhek actually collects for a project Melhek accepted in writing.", "VAT, third-party software licences, hardware, and other pass-through expenses are excluded.", "Discounts reduce the commission base. Partial client payments generate proportional commission. Unpaid or refunded amounts do not earn commission.", "A referral must be registered with the client’s permission and accepted in writing. Acceptance covers only the named project.", "The proposed protection period is 120 days; proposed payment timing is within 10 business days after Melhek receives each eligible payment.", "Separate projects, recurring support, renewals, and later unrelated work do not automatically earn commission."]} />
              </div>

              <div className="mt-8">
                <h3 className="font-syne text-lg font-bold text-slate-950">Outstanding information and decisions</h3>
                <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead className="bg-slate-100 text-[0.68rem] uppercase tracking-[0.12em] text-slate-600"><tr><th className="px-4 py-3 font-bold">Decision</th><th className="px-4 py-3 font-bold">Information or approval needed</th></tr></thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {[
                        ["Legal identities", "Confirm each contracting entity’s full legal name, legal form, and registered address."],
                        ["Representatives", "Insert authorized signatories’ names, titles, and authority."],
                        ["Referral channel", "Choose Melhek’s registration email or form and name the person who accepts referrals."],
                        ["Payment details", "Confirm Kenenét’s lawful payment method and required tax documents."],
                        ["Term and termination", "Approve or revise the proposed 12-month term, 30-day notice, and 10-business-day cure period."],
                        ["Review periods", "Approve or revise the proposed five-business-day referral response period."],
                        ["Attribution", "Approve or revise the proposed 90-day prior-contact test and 120-day protection period."],
                        ["Fee allocation", "Approve or revise the proposed proportional allocation of unassigned discounts, credits, and partial payments across mixed invoice lines."],
                        ["Payment timing", "Approve or revise the proposed 10-business-day commission deadline."],
                        ["Refunds and confidentiality", "Approve or revise the proposed 15-business-day repayment period and three-year confidentiality period."],
                        ["Disputes", "Confirm the proposed discussion period, mediation option, and suitable court venue."],
                      ].map(([decision, detail]) => <tr key={decision}><th scope="row" className="whitespace-nowrap px-4 py-3 align-top font-semibold text-slate-900">{decision}</th><td className="px-4 py-3 leading-6">{detail}</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-syne text-lg font-bold text-slate-950">Legal review flags</h3>
                <BulletList items={[
                  "Confirm the full legal identities of the contracting parties and the authority of their representatives before signature.",
                  "Ask Ethiopian counsel whether the referral arrangement triggers any agency, brokerage, registration, licensing, or tax requirements under the currently applicable Commercial Code and related rules.",
                  "Have Ethiopian counsel review the commission invoicing, VAT, and withholding language.",
                  "Review referral contact-data sharing and retention against Ethiopia’s Personal Data Protection Proclamation No. 1321/2024.",
                  "Have counsel review electronic execution under Electronic Signature Proclamation No. 1072/2018, as amended by Proclamation No. 1358/2024, and Electronic Signature Regulation No. 582/2025. Confirm the process, evidence, and intended signing method.",
                  "Confirm the governing-law and court-venue wording and whether an agreed mediation process is appropriate.",
                  "Have Ethiopian counsel confirm capacity, consent, any required form, and the application of the currently applicable Civil Code and Commercial Code to this referral arrangement.",
                ]} />
                <p className="mt-4 text-xs leading-5 text-slate-500">Reference materials for counsel’s review: <a className="underline underline-offset-2" href="https://justice.gov.et/en/law/regulation-no-582-2025-electronic-signature-regulation/" target="_blank" rel="noreferrer">Electronic Signature Regulation No. 582/2025</a>, <a className="underline underline-offset-2" href="https://justice.gov.et/am/law/proclamation-to-provide-for-the-amendment-of-the-electronic-signature-proclamation-no-1358-2024/" target="_blank" rel="noreferrer">Electronic Signature Proclamation amendment</a>, <a className="underline underline-offset-2" href="https://pdp.eca.et/pdp-proclamation" target="_blank" rel="noreferrer">Personal Data Protection Proclamation No. 1321/2024</a>, and the <a className="underline underline-offset-2" href="https://www.wipo.int/wipolex/en/legislation/details/21658" target="_blank" rel="noreferrer">Commercial Code Proclamation No. 1243/2021</a>. These links are research aids, not a legal opinion; counsel should confirm authoritative text, amendments, and applicability.</p>
              </div>

              <div className="mt-8">
                <h3 className="font-syne text-lg font-bold text-slate-950">Proposed referral registration procedure</h3>
                <ol className="mt-3 space-y-3">
                  {[
                    "Kenenét submits one client-and-project referral through the agreed Melhek email or form, confirming permission to share the client details.",
                    "Melhek logs the submission date and checks whether the same client and project are already known or actively being pursued.",
                    "Melhek accepts or rejects it in writing. No reply does not count as acceptance.",
                    "The acceptance names the client and project and records the protection-period start and end dates.",
                    "Melhek provides statements for accepted referrals showing payments received, exclusions, eligible collected fees, and commission paid or due.",
                  ].map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">{index + 1}</span><span>{step}</span></li>)}
                </ol>
              </div>

              <div className="mt-8 rounded-xl border border-slate-300 bg-slate-100 px-4 py-4 text-sm leading-6 text-slate-700">
                <p className="font-semibold text-slate-950">Approval record</p>
                <p className="mt-1">No approval or signature is recorded in this page. Before execution, the Parties should confirm the proposed terms, complete all identity and notice details, and arrange legal review. The Agreement is not executed until both authorized representatives have signed using an agreed method.</p>
              </div>
            </section>

            <footer className="mt-9 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
              Private internal review copy · Version 1.0 · No signing or acceptance is available in this workspace.
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}

export default async function CommercialDocumentsPage() {
  const authorized = await hasCommercialDocsAccess();

  if (!authorized) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-melhek-dark">
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-melhek-blue/[0.04] blur-[120px]" />
        </div>
        <div className="relative pb-16 pt-6">
          <AuthGate configured={isCommercialDocsAuthConfigured()} scope="commercial-documents" />
        </div>
      </main>
    );
  }

  return <ReviewWorkspace />;
}
