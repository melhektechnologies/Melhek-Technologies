import { createHash } from "node:crypto";
import { createElement } from "react";
import type { ReactElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { z } from "zod";
import AgreementSignaturePDF, { type AgreementExecutionRecord } from "@/lib/commercial-documents/AgreementSignaturePDF";
import { AGREEMENT_ID, AGREEMENT_VERSION, agreementClauses, agreedCommercialTerms, partyDetails } from "@/lib/commercial-documents/agreement";
import { createInitialAgreementSnapshot } from "@/lib/commercial-documents/snapshot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStoreHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
};

const signRequestSchema = z.object({
  agreementId: z.literal(AGREEMENT_ID),
  version: z.literal(AGREEMENT_VERSION),
  signerName: z.string().trim().min(3).max(100),
  signatureMode: z.enum(["typed", "drawn"]),
  signatureData: z.string().max(140_000).optional().default(""),
  confirmations: z.object({
    readTerms: z.literal(true),
    authority: z.literal(true),
    intention: z.literal(true),
  }).strict(),
}).strict();

function replyError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: noStoreHeaders });
}

function validSignatureImage(dataUrl: string) {
  const match = /^data:image\/png;base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  if (!match) return false;
  const bytes = Buffer.from(match[1], "base64");
  return bytes.length >= 100 && bytes.length <= 100_000 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 160_000) return replyError("Signature image is too large. Please clear it and sign again.", 413);

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return replyError("This signing request is not allowed.", 403);
    } catch {
      return replyError("This signing request is not allowed.", 403);
    }
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
    if (rawBody.length > 160_000) return replyError("Signature image is too large. Please clear it and sign again.", 413);
  } catch {
    return replyError("The signing request could not be read.", 400);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return replyError("The signing details are invalid.", 400);
  }

  const parsed = signRequestSchema.safeParse(body);
  if (!parsed.success) return replyError("Review the required confirmations and signing details, then try again.", 400);

  const form = parsed.data;
  const normalizedSigner = form.signerName.replace(/\s+/g, " ").toLocaleLowerCase("en-US");
  const expectedSigner = partyDetails[1].representative.replace(/\s+/g, " ").toLocaleLowerCase("en-US");
  if (normalizedSigner !== expectedSigner) return replyError("Enter the named Kenenét representative’s full name to continue.", 400);
  if (form.signatureMode === "drawn" && !validSignatureImage(form.signatureData)) return replyError("Add a clear drawn signature, or choose Type name.", 400);
  if (form.signatureMode === "typed" && form.signatureData) return replyError("The typed signature data is invalid.", 400);

  const snapshot = createInitialAgreementSnapshot();
  const termsHash = createHash("sha256").update(JSON.stringify({
    agreementId: AGREEMENT_ID,
    version: AGREEMENT_VERSION,
    parties: partyDetails,
    agreedCommercialTerms,
    clauses: agreementClauses,
  })).digest("hex");

  const execution: AgreementExecutionRecord = {
    signerName: form.signerName.replace(/\s+/g, " ").trim(),
    signerTitle: partyDetails[1].position,
    signatureMode: form.signatureMode,
    signatureData: form.signatureMode === "drawn" ? form.signatureData : undefined,
    signedAt: new Date().toISOString(),
    termsHash,
  };

  try {
    const pdf = await renderToBuffer(createElement(AgreementSignaturePDF, { snapshot, execution }) as unknown as ReactElement<DocumentProps>);
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        ...noStoreHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${AGREEMENT_ID}-v${AGREEMENT_VERSION}-party-b-signed.pdf"`,
        "Content-Length": String(pdf.byteLength),
      },
    });
  } catch {
    return replyError("The signed agreement copy could not be prepared. Please try again.", 500);
  }
}
