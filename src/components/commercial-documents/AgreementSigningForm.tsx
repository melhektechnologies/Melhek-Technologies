"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import { AGREEMENT_ID, AGREEMENT_VERSION } from "@/lib/commercial-documents/agreement";

type SignatureMode = "typed" | "drawn";
type Confirmations = { readTerms: boolean; authority: boolean; intention: boolean };

function pointOnCanvas(canvas: HTMLCanvasElement, event: PointerEvent<HTMLCanvasElement>) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

export default function AgreementSigningForm() {
  const [signerName, setSignerName] = useState("");
  const [mode, setMode] = useState<SignatureMode>("typed");
  const [confirmations, setConfirmations] = useState<Confirmations>({ readTerms: false, authority: false, intention: false });
  const [hasDrawn, setHasDrawn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [completedPdfUrl, setCompletedPdfUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  useEffect(() => () => {
    if (completedPdfUrl) URL.revokeObjectURL(completedPdfUrl);
  }, [completedPdfUrl]);

  const allConfirmed = confirmations.readTerms && confirmations.authority && confirmations.intention;
  const signatureReady = signerName.trim().length >= 3 && (mode === "typed" || hasDrawn);

  function beginDrawing(event: PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    canvas.setPointerCapture(event.pointerId);
    const point = pointOnCanvas(canvas, event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(point.x + 0.1, point.y + 0.1);
    context.strokeStyle = "#10244a";
    context.lineWidth = 4;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    drawingRef.current = true;
    setHasDrawn(true);
  }

  function continueDrawing(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const point = pointOnCanvas(canvas, event);
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function endDrawing(event: PointerEvent<HTMLCanvasElement>) {
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }

  function clearDrawing() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!allConfirmed || !signatureReady || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const signatureData = mode === "drawn" ? canvasRef.current?.toDataURL("image/png") ?? "" : "";
      const response = await fetch("/api/agreements/kenenet-consultancy/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agreementId: AGREEMENT_ID,
          version: AGREEMENT_VERSION,
          signerName: signerName.trim(),
          signatureMode: mode,
          signatureData,
          confirmations,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(body?.error || "We could not prepare your signed copy. Please try again.");
      }

      const signedPdf = await response.blob();
      const objectUrl = URL.createObjectURL(signedPdf);
      setCompletedPdfUrl(objectUrl);
      const downloadLink = document.createElement("a");
      downloadLink.href = objectUrl;
      downloadLink.download = "Kenenet-Referral-Partnership-Agreement-signed.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
      setComplete(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not prepare your signed copy. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function toggleConfirmation(key: keyof Confirmations) {
    setConfirmations((current) => ({ ...current, [key]: !current[key] }));
  }

  if (complete) {
    return (
      <section aria-live="polite" className="mx-auto mt-8 max-w-5xl rounded-3xl border border-emerald-300/25 bg-emerald-300/[0.08] p-6 sm:p-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">Party B signed copy</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-white">Your signed copy is ready.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">Please save the signed PDF and send it to Melhek for countersignature. The Agreement takes effect after both Parties sign.</p>
        {completedPdfUrl && <a href={completedPdfUrl} download="Kenenet-Referral-Partnership-Agreement-signed.pdf" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-blue-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-blue-200">Download signed copy</a>}
        <p className="mt-3 text-xs leading-5 text-white/45">The signed copy is prepared for this session and is not retained by this page. This signing method is not certificate-based.</p>
      </section>
    );
  }

  return (
    <section id="agreement-signing" className="mx-auto mt-8 max-w-5xl scroll-mt-24 rounded-[1.75rem] border border-melhek-blue/25 bg-gradient-to-br from-melhek-blue/[0.09] via-melhek-navy/90 to-melhek-navy p-5 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
      <div className="max-w-3xl">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">Electronic signing · Party B</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Sign the agreement</h2>
        <p className="mt-3 text-sm leading-6 text-white/65">Review the agreement above. Confirm your authority and intent, then sign below. Your signed copy will be generated and downloaded; Melhek must also countersign before the Agreement takes effect.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-7">
        <fieldset className="space-y-3">
          <legend className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Required confirmations</legend>
          {([
            ["readTerms", "I have reviewed this Referral Partnership Agreement and agree to its terms."],
            ["authority", "I am authorized to sign this Agreement for Kenenét Consultancy."],
            ["intention", "I intend the signature below to sign this Agreement electronically."],
          ] as const).map(([key, label]) => (
            <label key={key} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm leading-6 transition ${confirmations[key] ? "border-blue-300/30 bg-blue-300/[0.08] text-white" : "border-white/10 bg-white/[0.025] text-white/75 hover:border-white/20"}`}>
              <input type="checkbox" checked={confirmations[key]} onChange={() => toggleConfirmation(key)} className="mt-1 h-4 w-4 shrink-0 accent-blue-400" />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>

        <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-7">
          <div>
            <label htmlFor="agreement-signer-name" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Full name</label>
            <input id="agreement-signer-name" autoComplete="name" required minLength={3} maxLength={100} placeholder="Enter Bayush Mamo" value={signerName} onChange={(event) => setSignerName(event.target.value)} className="w-full rounded-xl border border-white/15 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-300/60 focus:ring-2 focus:ring-blue-300/15" />
            <p className="mt-2 text-xs leading-5 text-white/45">Signing for Kenenét Consultancy · Founder and Managing Director</p>
          </div>

          <fieldset>
            <legend className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Signature</legend>
            <div className="mb-3 inline-flex rounded-xl border border-white/10 bg-slate-950/35 p-1" role="group" aria-label="Signature method">
              <button type="button" onClick={() => setMode("typed")} aria-pressed={mode === "typed"} className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${mode === "typed" ? "bg-blue-300 text-slate-950" : "text-white/55 hover:text-white"}`}>Type name</button>
              <button type="button" onClick={() => setMode("drawn")} aria-pressed={mode === "drawn"} className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${mode === "drawn" ? "bg-blue-300 text-slate-950" : "text-white/55 hover:text-white"}`}>Draw signature</button>
            </div>
            {mode === "typed" ? (
              <div aria-label={`Typed signature: ${signerName || "empty"}`} className="flex min-h-[92px] items-center justify-center rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-center font-serif text-3xl italic text-blue-200">
                {signerName.trim() || <span className="text-lg not-italic text-white/25">Enter your full name</span>}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
                <canvas ref={canvasRef} width={680} height={160} aria-label="Draw your signature in this area" className="block h-28 w-full touch-none cursor-crosshair" onPointerDown={beginDrawing} onPointerMove={continueDrawing} onPointerUp={endDrawing} onPointerCancel={endDrawing} />
                <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2">
                  <span className="text-[10px] text-slate-500">Sign using your finger, mouse, or stylus.</span>
                  <button type="button" onClick={clearDrawing} className="text-[10px] font-semibold text-blue-800 underline underline-offset-2">Clear</button>
                </div>
              </div>
            )}
          </fieldset>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-xs leading-5 text-white/45">
          Your signature is added to the PDF generated for this session; this page does not retain a copy. Save the signed PDF and return it to Melhek for countersignature. This is not a certificate-based signature.
        </div>

        {error && <p role="alert" className="rounded-xl border border-rose-300/25 bg-rose-300/[0.08] px-4 py-3 text-sm text-rose-100">{error}</p>}

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-5 text-white/40">Referral Partnership Agreement</p>
          <button type="submit" disabled={!allConfirmed || !signatureReady || submitting} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-blue-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-200 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-900 sm:w-auto">
            {submitting ? "Preparing signed copy…" : "Sign agreement & download copy"}
          </button>
        </div>
      </form>
    </section>
  );
}
