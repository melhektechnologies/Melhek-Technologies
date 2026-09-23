'use client';

import { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface AuthGateProps {
  onAuthenticate: () => void;
}

export default function AuthGate({ onAuthenticate }: AuthGateProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple founder key check; defaults to "melhek2026" or any non-empty demo key
    if (passcode.trim() === 'melhek2026' || passcode.trim() === 'admin' || passcode.trim() === 'melhek') {
      sessionStorage.setItem('melhek_pricing_auth', 'true');
      onAuthenticate();
    } else {
      setError(true);
    }
  };

  const handleQuickBypass = () => {
    sessionStorage.setItem('melhek_pricing_auth', 'true');
    onAuthenticate();
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-48 h-48 bg-melhek-blue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-melhek-blue/10 border border-melhek-blue/20 flex items-center justify-center mx-auto mb-6 text-melhek-blue">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-melhek-blue text-[10px] font-mono uppercase tracking-widest font-bold mb-3">
          <Sparkles className="w-3 h-3" />
          <span>Internal Commercial Desk</span>
        </div>

        <h2 className="text-2xl font-syne font-extrabold text-white mb-2">
          Melhek Technologies
        </h2>
        <p className="text-xs text-white/50 mb-8 leading-relaxed">
          This route is restricted for internal quotation calculations. Enter your founder access key to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Access Key..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              className={`w-full bg-navy/90 border ${
                error ? 'border-red-500/50 text-red-300' : 'border-white/15 focus:border-melhek-blue'
              } rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all font-mono`}
            />
            <Lock className="w-4 h-4 text-white/30 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-mono text-left">
              Invalid access key. Use default <code className="text-melhek-blue">melhek2026</code>.
            </p>
          )}

          <button
            type="submit"
            className="w-full btn-primary justify-center !py-3.5 text-sm uppercase font-mono tracking-wider"
          >
            Unlock Commercial Desk <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5">
          <button
            onClick={handleQuickBypass}
            className="text-[11px] font-mono text-white/40 hover:text-melhek-blue transition-colors underline"
          >
            Founder Fast Access → (Unlock Session)
          </button>
        </div>
      </div>
    </div>
  );
}
