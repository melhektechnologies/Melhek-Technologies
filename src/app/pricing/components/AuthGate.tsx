'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowRight, Lock, ShieldCheck } from 'lucide-react';

type AuthGateProps = {
  configured: boolean;
  scope?: "pricing" | "commercial-documents";
};

export default function AuthGate({ configured, scope = "pricing" }: AuthGateProps) {
  const isCommercialDocuments = scope === "commercial-documents";
  const authEndpoint = isCommercialDocuments
    ? "/api/internal/commercial-documents/auth"
    : "/api/pricing/auth";
  const inputId = isCommercialDocuments ? "commercial-documents-access-key" : "pricing-access-key";
  const router = useRouter();
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(authEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessKey }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setError(
          response.status === 429
            ? 'Too many attempts. Try again in 15 minutes.'
            : payload.error || 'Access key not accepted. Check it and try again.',
        );
        setAccessKey('');
        return;
      }

      router.refresh();
    } catch {
      setError('Could not reach the access service. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 p-8 text-center shadow-2xl glass">
        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-melhek-blue/8 blur-3xl" />

        <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-melhek-blue/20 bg-melhek-blue/10 text-melhek-blue">
          <ShieldCheck className="h-8 w-8" aria-hidden="true" />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-melhek-blue">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-melhek-blue" />
          {isCommercialDocuments ? 'Private Agreement Review' : 'Internal Commercial Desk'}
        </div>

        <h1 className="mb-1.5 text-2xl font-syne font-extrabold text-white">Melhek Technologies</h1>
        <p className="mx-auto mb-8 max-w-xs text-xs leading-relaxed text-white/40">
          {isCommercialDocuments
            ? 'This private agreement workspace is restricted. Enter its dedicated access key to continue.'
            : 'This private workspace is restricted. Enter your access key to continue.'}
        </p>

        {configured ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <label className="sr-only" htmlFor={inputId}>Access key</label>
              <input
                ref={inputRef}
                id={inputId}
                name="accessKey"
                type="password"
                placeholder="Enter access key"
                value={accessKey}
                autoComplete="current-password"
                autoCapitalize="none"
                spellCheck={false}
                required
                disabled={isSubmitting}
                onChange={(event) => {
                  setAccessKey(event.target.value);
                  setError('');
                }}
                className={`w-full rounded-xl border bg-melhek-navy/90 px-4 py-3.5 pr-11 text-sm font-mono text-white outline-none transition-all placeholder:text-white/30 disabled:opacity-60 ${
                  error ? 'border-red-500/50' : 'border-white/15 focus:border-melhek-blue'
                }`}
              />
              <Lock className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" aria-hidden="true" />
            </div>

            {error && (
              <div role="alert" className="flex items-center gap-2 px-1 text-left text-xs font-mono text-red-400">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !accessKey}
              className="btn-primary w-full justify-center !py-3.5 text-sm uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? 'Checking access…'
                : isCommercialDocuments
                  ? 'Unlock Agreement Review'
                  : 'Unlock Commercial Desk'}
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        ) : (
          <div role="status" className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-left text-xs leading-relaxed text-amber-100/80">
            {isCommercialDocuments ? (
              <>
                Agreement access is not configured on this server. Set the server-only <code>COMMERCIAL_DOCS_ACCESS_KEY</code> and <code>PRICING_SESSION_SECRET</code> environment variables to enable it.
              </>
            ) : (
              <>
                Private access is not configured on this deployment. Set server-only <code>PRICING_ACCESS_KEY</code> and <code>PRICING_SESSION_SECRET</code> environment variables to enable it.
              </>
            )}
          </div>
        )}

        <div className="mt-8 border-t border-white/5 pt-5">
          <p className="text-[10px] font-mono text-white/20">
            Melhek Technologies © {new Date().getFullYear()} · Internal Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
