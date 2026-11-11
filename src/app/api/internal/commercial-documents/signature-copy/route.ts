import { createElement } from "react";
import type { ReactElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import AgreementSignaturePDF from "@/lib/commercial-documents/AgreementSignaturePDF";
import { AGREEMENT_ID, AGREEMENT_VERSION } from "@/lib/commercial-documents/agreement";
import { createInitialAgreementSnapshot } from "@/lib/commercial-documents/snapshot";
import { hasCommercialDocsAccess, PRIVATE_RESPONSE_HEADERS } from "@/lib/pricing/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasCommercialDocsAccess())) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401, headers: PRIVATE_RESPONSE_HEADERS },
    );
  }

  try {
    const snapshot = createInitialAgreementSnapshot();
    const pdf = await renderToBuffer(createElement(AgreementSignaturePDF, { snapshot }) as unknown as ReactElement<DocumentProps>);
    const filename = `${AGREEMENT_ID}-v${AGREEMENT_VERSION}-signature-copy.pdf`;

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        ...PRIVATE_RESPONSE_HEADERS,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdf.byteLength),
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    console.error("Failed to render commercial agreement signature PDF.", error);
    return NextResponse.json(
      { error: "The signature PDF could not be prepared." },
      { status: 500, headers: PRIVATE_RESPONSE_HEADERS },
    );
  }
}
