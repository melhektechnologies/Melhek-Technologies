import {
  AGREEMENT_ID,
  AGREEMENT_VERSION,
  agreementClauses,
  agreedCommercialTerms,
  partyDetails,
  type AgreementClause,
} from "@/lib/commercial-documents/agreement";

export type AgreementSnapshot = {
  agreementId: string;
  version: string;
  title: string;
  parties: Array<{
    label: "Party A" | "Party B";
    tradingName: string;
    legalName: string;
    legalForm: string;
    address: string;
    representative: string;
    position: string;
    noticeEmail: string;
  }>;
  agreedCommercialTerms: typeof agreedCommercialTerms;
  clauses: AgreementClause[];
};

export function createInitialAgreementSnapshot(): AgreementSnapshot {
  return {
    agreementId: AGREEMENT_ID,
    version: AGREEMENT_VERSION,
    title: "Referral Partnership Agreement",
    parties: partyDetails.map((party) => ({
      label: party.label,
      tradingName: party.tradingName,
      legalName: party.legalName,
      legalForm: party.legalForm,
      address: party.address,
      representative: party.representative,
      position: party.position,
      noticeEmail: party.noticeEmail,
    })),
    agreedCommercialTerms,
    clauses: agreementClauses,
  };
}
