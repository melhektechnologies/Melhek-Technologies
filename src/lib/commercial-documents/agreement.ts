export const AGREEMENT_ID = "MEL-KEN-REF-001";
export const AGREEMENT_VERSION = "3.3";

export type AgreementBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "example"; title: string; text: string };

export type AgreementClause = {
  id: string;
  number: number;
  title: string;
  blocks: AgreementBlock[];
};

export const agreedCommercialTerms = [
  "10% commission rate.",
  "Commission applies to eligible project implementation fees actually received by Melhek.",
  "Exclude VAT, third-party software licences, hardware, and other pass-through expenses.",
  "Pay commission proportionally to the corresponding client payments Melhek receives.",
  "A referral must be registered and accepted in writing for a named project.",
  "No automatic commission on unrelated future projects.",
] as const;

export const partyDetails = [
  {
    label: "Party A",
    tradingName: "Melhek Technologies",
    legalName: "Melhek Technologies",
    legalForm: "Independently operated technology business",
    address: "Addis Ababa, Ethiopia",
    representative: "Abraham Sintayehu",
    position: "CEO and Founder",
    noticeEmail: "melhektechnologies@gmail.com",
  },
  {
    label: "Party B",
    tradingName: "Kenenét Consultancy",
    legalName: "Kenenét Consultancy",
    legalForm: "Registered business",
    address: "Addis Ababa, Ethiopia",
    representative: "Bayush Mamo",
    position: "Founder and Managing Director",
    noticeEmail: "kenenetconsultancy@gmail.com",
  },
] as const;

export const agreementClauses: AgreementClause[] = [
  {
    id: "parties", number: 1, title: "Parties and effective date", blocks: [
      { type: "paragraph", text: "This Agreement is between (A) Melhek Technologies, an independently operated technology business based in Addis Ababa and represented by Abraham Sintayehu, CEO and Founder (Party A), and (B) Kenenét Consultancy, a registered business based in Addis Ababa and represented by Bayush Mamo, Founder and Managing Director (Party B). Each representative signs on behalf of the business they represent." },
      { type: "paragraph", text: "Each Party confirms that its stated identity and contact details are accurate and that its signatory has authority to sign. The Effective Date is the date the last Party signs this Agreement." },
    ],
  },
  {
    id: "purpose", number: 2, title: "Purpose and nature of relationship", blocks: [
      { type: "paragraph", text: "This Agreement governs Kenenét’s non-exclusive referrals of prospective clients to Melhek for potential digital technology projects. A referral by Melhek to Kenenét, or commission for such a referral, requires a separate written agreement. Neither Party promises a minimum number of referrals, projects, or revenue." },
      { type: "paragraph", text: "The word “partnership” describes this referral arrangement only. The Parties intend to create no legal partnership, joint venture, employment, franchise, or agency relationship. Each Party remains responsible for its own business, personnel, expenses, and obligations." },
    ],
  },
  {
    id: "qualified-referral", number: 3, title: "Qualified referral", blocks: [
      { type: "paragraph", text: "A “Qualified Referral” is a prospective client and specific project opportunity that meets all of the following conditions:" },
      { type: "list", items: ["Kenenét submits it to Melhek under Clause 4.", "The client and specific project or business need are identifiable.", "The referral is made with the prospective client’s permission to share the relevant contact and project information.", "Melhek accepts the referral in writing."] },
      { type: "paragraph", text: "A referral does not qualify if the same client-and-project opportunity was already accepted from another source, or Melhek had documented substantive sales activity for that specific opportunity during the 90 calendar days before submission. Mere prior awareness of a client does not exclude a distinct project. An existing client may be referred for a new project if that specific project meets these requirements and Melhek accepts it in writing." },
      { type: "paragraph", text: "Acceptance applies only to the client and project described in the registration. It does not create an automatic commission right over the client’s other or future work." },
    ],
  },
  {
    id: "submission", number: 4, title: "Referral submission and acceptance", blocks: [
      { type: "paragraph", text: "Kenenét will submit each referral to melhektechnologies@gmail.com, or to another referral channel Melhek later designates in writing, including:" },
      { type: "list", items: ["Client or organization name.", "Contact name and business contact details, where authorized.", "Brief description of the project need.", "Date and context of the introduction.", "Confirmation that the client permitted the referral and sharing of the submitted details."] },
      { type: "paragraph", text: "Melhek will confirm receipt and either accept or reject the referral in writing. Acceptance must identify the client and project, record the acceptance date, and state the referral protection expiry date. Silence, an introduction alone, or a client’s later contact with Melhek does not constitute acceptance." },
      { type: "paragraph", text: "Melhek will respond within five business days. If more information is needed, Melhek may request it; the response period resumes when the requested information is supplied. No commission is earned unless acceptance is in writing." },
    ],
  },
  {
    id: "commission", number: 5, title: "Commission and eligible fees", blocks: [
      { type: "paragraph", text: "For each Qualified Referral, Kenenét’s commission is 10% of the Eligible Collected Implementation Fees for the accepted project. This rate applies only to the accepted project and its eligible collected implementation fees." },
      { type: "paragraph", text: "“Eligible Collected Implementation Fees” means implementation fees related to the specific project accepted in writing, actually received by Melhek in cleared funds from the client, and remaining after project discounts or credits." },
      { type: "paragraph", text: "The commission base excludes:" },
      { type: "list", items: ["VAT.", "Third-party software or subscription licences.", "Hardware.", "All other pass-through expenses and reimbursements."] },
      { type: "paragraph", text: "A markup or handling charge directly associated with an excluded pass-through item is excluded. For mixed invoices, unassigned project discounts or credits and partial payments are allocated proportionally across the resulting eligible and excluded line-item balances, unless a client remittance instruction identifies a different allocation and Melhek records it consistently." },
      { type: "example", title: "Commission example", text: "If an invoice has ETB 100,000 in eligible implementation fees and ETB 100,000 in excluded costs, a payment of ETB 100,000 is 50% of the invoice. With proportional allocation, ETB 50,000 is eligible collected fees and the commission is ETB 5,000." },
      { type: "paragraph", text: "No commission is due on unpaid, waived, written-off, refunded, or cancelled amounts." },
      { type: "paragraph", text: "Commission applies only to the project scope described in the accepted registration and client contract. Separate projects, renewals, recurring support or maintenance, and later unrelated work require separate written acceptance. A change order is included only if Melhek expressly accepts it in writing as commissionable and identifies the fee." },
    ],
  },
  {
    id: "payment", number: 6, title: "Statements, payment timing, and method", blocks: [
      { type: "paragraph", text: "Melhek will provide a statement showing client payments received, excluded amounts, eligible collected amounts, and commission due." },
      { type: "paragraph", text: "Melhek will issue the commission statement and pay within 10 business days after receiving the corresponding eligible client payment in cleared funds. For client installments, commission is paid proportionally after each installment clears. “Business Day” means a day on which commercial banks are generally open for ordinary business in Addis Ababa, excluding weekends and public holidays observed by those banks." },
      { type: "paragraph", text: "Payment will be made by lawful bank transfer to Kenenét’s nominated account, in the currency agreed in writing for the accepted project. Each Party is responsible for its own tax filings. Any legally required withholding may be deducted with applicable evidence provided; VAT on the commission itself will be handled as required by law and against valid tax documentation." },
    ],
  },
  {
    id: "refunds", number: 7, title: "Refunds, cancellations, and client non-payment", blocks: [
      { type: "paragraph", text: "No commission is due on an amount Melhek does not receive. If Melhek refunds or credits a client after paying commission on that amount, Kenenét will return the corresponding commission or agree to a credit against future commissions." },
      { type: "paragraph", text: "Kenenét will repay or authorize the agreed credit within 15 business days after receiving Melhek’s calculation and supporting statement. Any adjustment is limited to the commission attributable to the amount actually refunded or credited." },
      { type: "paragraph", text: "The corresponding commission may be offset against future commission by agreement. If no future commission is available for an offset, repayment is made by bank transfer." },
    ],
  },
  {
    id: "responsibilities", number: 8, title: "Responsibilities", blocks: [
      { type: "paragraph", text: "Kenenét will:" },
      { type: "list", items: ["Make introductions honestly and with the client’s permission.", "Provide accurate referral information.", "Avoid promising prices, delivery dates, features, or outcomes on Melhek’s behalf.", "Not collect project payments for Melhek.", "Promptly disclose any potential conflict of interest relevant to a referral."] },
      { type: "paragraph", text: "Melhek will:" },
      { type: "list", items: ["Decide independently whether to pursue, scope, price, contract for, or decline a referred project.", "Manage its client proposals, contracts, delivery, invoices, and collections.", "Provide commission statements for accepted referrals.", "Promptly notify Kenenét of material client payments, cancellations, or refunds affecting commission."] },
      { type: "paragraph", text: "Neither Party guarantees that a referral will become a client or that a project will be profitable." },
    ],
  },
  {
    id: "confidentiality", number: 9, title: "Confidentiality and client information", blocks: [
      { type: "paragraph", text: "Each Party will protect the other Party’s non-public commercial, technical, financial, and client information; use it only for this referral arrangement; and share it only with personnel or advisers who need it and are bound to protect it." },
      { type: "paragraph", text: "These obligations do not cover information the receiving Party can show was public without breach, already lawfully known, independently developed, or lawfully received from another source." },
      { type: "paragraph", text: "Each Party will handle personal information only for the referral purpose and in accordance with applicable Ethiopian law. Kenenét will obtain the prospective client’s permission to share referral details with Melhek. On request or termination, each Party will return or securely delete the other Party’s confidential information, subject to lawful retention requirements." },
      { type: "paragraph", text: "Ordinary confidentiality obligations continue for three years after termination. Trade secrets remain protected for as long as they qualify as trade secrets." },
    ],
  },
  {
    id: "non-exclusivity", number: 10, title: "Non-exclusivity", blocks: [
      { type: "paragraph", text: "Either Party may work with other referral sources, providers, and clients, including in similar fields, provided it complies with this Agreement and does not misuse the other Party’s confidential information." },
    ],
  },
  {
    id: "independent-parties", number: 11, title: "Independent contractors and no authority to bind", blocks: [
      { type: "paragraph", text: "Each Party acts as an independent contractor. Neither Party may make a commitment, representation, warranty, financial promise, or client contract in the other Party’s name." },
      { type: "paragraph", text: "Neither Party may represent that it is an agent, employee, legal partner, or authorized representative of the other." },
    ],
  },
  {
    id: "intellectual-property", number: 12, title: "Intellectual property and names", blocks: [
      { type: "paragraph", text: "Each Party retains ownership of its names, logos, materials, software, and other intellectual property. No ownership is transferred by this Agreement." },
      { type: "paragraph", text: "A Party may use the other Party’s name or logo in marketing only with that Party’s prior written approval. Any permission to use a logo is limited, revocable, and subject to the owner’s brand instructions." },
    ],
  },
  {
    id: "term", number: 13, title: "Term and termination", blocks: [
      { type: "paragraph", text: "This Agreement continues for an initial 12 months and renews for successive 12-month periods unless either Party gives 30 days’ written notice of non-renewal." },
      { type: "paragraph", text: "Either Party may terminate for convenience on 30 days’ written notice. A Party may terminate immediately for serious misconduct or unlawful conduct connected with this Agreement. For another material breach that can be remedied, the breaching Party has 10 business days after written notice to remedy it; the non-breaching Party may terminate if it remains uncured." },
    ],
  },
  {
    id: "after-termination", number: 14, title: "Accepted referrals after termination", blocks: [
      { type: "paragraph", text: "Termination does not affect commissions already accrued or an accepted referral’s remaining protection period under this Clause." },
      { type: "paragraph", text: "Each accepted referral is protected for 180 calendar days from Melhek’s written acceptance. The client must sign a contract for the specific accepted project within that period. If it does, commission remains payable on eligible installment payments Melhek later receives under that contract, including payments after this Agreement ends or the protection period expires. If no contract is signed within the protection period, the referral expires and a later opportunity requires a new written registration and acceptance. Termination does not shorten an unexpired protection period." },
      { type: "paragraph", text: "No commission is created for referrals submitted but not accepted before termination, or for new projects or unrelated work not separately accepted in writing." },
    ],
  },
  {
    id: "disputes", number: 15, title: "Disputes", blocks: [
      { type: "paragraph", text: "The Parties will first attempt to resolve a dispute through good-faith discussion between authorized representatives." },
      { type: "paragraph", text: "The Parties will allow 30 days for good-faith discussion. They may proceed to mediation in Addis Ababa if both agree. If unresolved, either Party may refer the dispute to a court with competent jurisdiction in Ethiopia." },
    ],
  },
  {
    id: "governing-law", number: 16, title: "Governing law", blocks: [
      { type: "paragraph", text: "This Agreement is governed by the laws of the Federal Democratic Republic of Ethiopia." },
    ],
  },
  {
    id: "amendments", number: 17, title: "Amendments and entire agreement", blocks: [
      { type: "paragraph", text: "This Agreement, including any referral accepted in writing under Clause 4, records the entire agreement between the Parties about this referral arrangement and replaces prior discussions on that subject." },
      { type: "paragraph", text: "Any amendment must be in writing and approved by authorized representatives of both Parties. If a provision is unenforceable, the remaining provisions continue to apply to the extent permitted by law." },
    ],
  },
  {
    id: "notices", number: 18, title: "Notices", blocks: [
      { type: "paragraph", text: "Formal notices under this Agreement must be sent by email to the designated business addresses:" },
      { type: "paragraph", text: "Melhek: melhektechnologies@gmail.com. Kenenét: kenenetconsultancy@gmail.com." },
      { type: "paragraph", text: "Either Party may update its notice email by written notice to the other. An email notice is received when delivery is confirmed or acknowledged, subject to mandatory legal rules." },
    ],
  },
  {
    id: "electronic-execution", number: 19, title: "Counterparts and electronic execution", blocks: [
      { type: "paragraph", text: "The Parties may sign a paper copy, PDF counterparts, or use an electronic method mutually agreed for this transaction. If Party B uses the designated agreement page, the signer will confirm authority and intent to sign and provide a typed or drawn signature. The generated PDF will record the signer's name, signature method, UTC date and time, Agreement ID and version, and a hash of the Agreement terms. The Parties may exchange signed copies through a communication channel they mutually agree to use." },
      { type: "paragraph", text: "The agreement page records an electronic signing event but does not represent it as a certificate-based or qualified digital signature. Both Parties must sign, and the Effective Date is the date of the last signature. Each Party will keep a copy of the signed Agreement." },
    ],
  },
];
