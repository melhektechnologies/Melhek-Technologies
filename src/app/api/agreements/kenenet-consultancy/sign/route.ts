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
  signatureData: z.string().min(1).max(140_000),
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
  if (!validSignatureImage(form.signatureData)) return replyError("Draw your signature in the signing area, then try again.", 400);

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
    signatureData: form.signatureData,
    signedAt: new Date().toISOString(),
    termsHash,
  };

  try {
    const pdf = await renderToBuffer(createElement(AgreementSignaturePDF, { snapshot, execution }) as unknown as ReactElement<DocumentProps>);
    let telegramStatus: "sent" | "failed" | "not-configured" = "not-configured";
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (botToken && chatId) {
      try {
        const telegramForm = new FormData();
        telegramForm.set("chat_id", chatId);
        telegramForm.set("caption", `Referral Partnership Agreement signed by ${execution.signerName} for Kenenét Consultancy. Signed at ${execution.signedAt} UTC. The PDF is attached for Melhek's countersignature.`);
        telegramForm.set("document", new Blob([new Uint8Array(pdf)], { type: "application/pdf" }), "Kenenet-Referral-Partnership-Agreement-signed.pdf");
        const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
          method: "POST",
          body: telegramForm,
          signal: AbortSignal.timeout(8_000),
          cache: "no-store",
        });
        const telegramResult = await telegramResponse.json().catch(() => null) as { ok?: boolean; description?: string } | null;
        telegramStatus = telegramResponse.ok && telegramResult?.ok ? "sent" : "failed";
        if (telegramStatus === "failed") {
          console.error("Kenenét agreement Telegram delivery rejected:", {
            httpStatus: telegramResponse.status,
            reason: telegramResult?.description?.slice(0, 180) ?? "Telegram returned no error detail",
          });
        }
      } catch (error) {
        telegramStatus = "failed";
        console.error("Kenenét agreement Telegram delivery request failed:", error instanceof Error ? error.name : "unknown error");
      }
    }

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        ...noStoreHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Kenenet-Referral-Partnership-Agreement-signed.pdf"',
        "Content-Length": String(pdf.byteLength),
        "X-Telegram-Notification": telegramStatus,
      },
    });
  } catch (error) {
    console.error("Kenenét agreement PDF generation failed:", error instanceof Error ? error.message : "unknown error");
    return replyError("The signed agreement copy could not be prepared. Please try again.", 500);
  }
}
