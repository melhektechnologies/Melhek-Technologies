'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, FileText, AlertTriangle, CheckCircle2,
  LogOut, Copy, Star, Clock, Search, ChevronDown,
  Printer, Zap, Filter, BookOpen, AlertCircle, CheckSquare
} from 'lucide-react';

import DashboardHeader from './DashboardHeader';
import QuoteStepNavigation from './QuoteStepNavigation';
import StepClient from './StepClient';
import StepProject from './StepProject';
import StepScope from './StepScope';
import StepComplexity from './StepComplexity';
import StepCommercial from './StepCommercial';
import StepRecurring from './StepRecurring';
import StepPayment from './StepPayment';
import StepReview from './StepReview';

import {
  Quote,
  ProjectCategoryId,
  QuoteStatus,
} from '@/lib/pricing/types';

import {
  createBlankQuote,
  getLocalQuotes,
  saveLocalQuote,
  deleteLocalQuote,
  calculateDashboardMetrics,
  generateQuoteId,
} from '@/lib/pricing/quoteStore';
import { calculateQuoteFinancials, generateQuoteInsights, estimateDefaultLaborHours } from '@/lib/pricing/pricingEngine';
import { PRICING_CATEGORIES } from '@/lib/pricing/pricingConfig';

/* ─── helpers ─── */
const STATUS_STYLES: Record<QuoteStatus, string> = {
  Draft: 'bg-white/10 text-white/60 border-white/10',
  Sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Negotiating: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Accepted: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  Expired: 'bg-white/5 text-white/30 border-white/10',
  Completed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const ALL_STATUSES: QuoteStatus[] = ['Draft', 'Sent', 'Negotiating', 'Accepted', 'Rejected', 'Expired', 'Completed'];

function fmt(amount: number) {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M ETB`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K ETB`;
  return `${amount.toLocaleString()} ETB`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getCategoryName(id: ProjectCategoryId): string {
  return PRICING_CATEGORIES.find(c => c.id === id)?.name ?? id;
}

function getRecurringMonthly(quote: Quote): number {
  return quote.recurringServices.filter(s => s.selected).reduce((sum, s) => {
    if (s.cycle === 'Annual') return sum + Math.round(s.priceETB / 12);
    if (s.cycle === 'Quarterly') return sum + Math.round(s.priceETB / 3);
    return sum + s.priceETB;
  }, 0);
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* LIVE PRICE PANEL                                                            */
/* ═══════════════════════════════════════════════════════════════════════════ */
function LivePricePanel({ quote, onPremiumChange }: { quote: Quote; onPremiumChange: (pct: number) => void }) {
  const f = quote.financials;
  const recurringMonthly = getRecurringMonthly(quote);
  const isWarn = f.isBelowMinimumSafe;
  const isBelowRec = f.isSubstantiallyBelowRecommended && !isWarn;
  const isPremium = f.isPremiumPositioned;
  const isGood = !isWarn && !isBelowRec && !isPremium;
  const premiumPct = quote.commercial.premiumPositioningUpliftPct ?? 0;

  return (
    <div className="glass rounded-2xl border border-white/10 p-5 space-y-4 sticky top-28 bg-white/[0.01]">
      {/* Header */}
      <div className="pb-3 border-b border-white/5">
        <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Live Calculation</div>
        <div className="text-[10px] font-mono font-bold text-melhek-blue truncate">{quote.id}</div>
      </div>

      {/* MAIN PRICE — most visually dominant element */}
      <div>
        <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Recommended Investment</div>
        <div className="text-2xl md:text-3xl font-syne font-extrabold text-gradient leading-none">
          {f.recommendedPriceETB.toLocaleString()}
        </div>
        <div className="text-sm text-melhek-steel/70 font-mono mt-0.5">ETB</div>
      </div>

      {/* Final Negotiated */}
      <div className={`rounded-xl p-3 border ${
        isWarn ? 'bg-red-500/10 border-red-500/20' :
        isBelowRec ? 'bg-amber-500/10 border-amber-500/20' :
        isPremium ? 'bg-purple-500/10 border-purple-500/20' :
        'bg-melhek-blue/5 border-melhek-blue/15'
      }`}>
        <div className="text-[9px] font-mono uppercase tracking-widest mb-1 text-white/40">Final Negotiated Price</div>
        <div className={`text-xl font-syne font-extrabold ${
          isWarn ? 'text-red-400' :
          isBelowRec ? 'text-amber-400' :
          isPremium ? 'text-purple-300' :
          'text-white'
        }`}>
          {f.finalNegotiatedPriceETB.toLocaleString()} <span className="text-xs text-white/40">ETB</span>
        </div>
        <div className="text-[9px] text-white/30 font-mono mt-0.5">
          ≈ ${Math.round(f.finalNegotiatedPriceETB / 120).toLocaleString()} USD
        </div>
      </div>

      {/* Guardrail Status */}
      {isWarn && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[11px]">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <div>
            <div className="font-bold font-mono">BELOW MINIMUM SAFE FLOOR</div>
            <div className="text-[10px] opacity-70">Min: {f.minimumSafePriceETB.toLocaleString()} ETB</div>
          </div>
        </div>
      )}
      {isBelowRec && !isWarn && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Substantially below recommended. Verify commercial justification.</span>
        </div>
      )}
      {isPremium && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px]">
          <Star className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Premium positioning active — confirm scope and value delivery.</span>
        </div>
      )}
      {isGood && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{f.estimatedGrossMarginPct}% gross margin — guardrail passed</span>
        </div>
      )}

      {/* Price Band */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Min Safe', value: f.minimumSafePriceETB, color: 'text-red-400' },
          { label: 'Recommended', value: f.recommendedPriceETB, color: 'text-melhek-blue' },
          { label: 'Premium', value: f.premiumOpportunityPriceETB, color: 'text-amber-400' },
        ].map(item => (
          <div key={item.label} className="bg-melhek-navy/80 border border-white/5 rounded-xl p-2 text-center">
            <div className="text-[8px] font-mono text-white/30 uppercase">{item.label}</div>
            <div className={`text-[10px] font-mono font-bold ${item.color}`}>{fmt(item.value)}</div>
          </div>
        ))}
      </div>

      {/* Financial Breakdown */}
      <div className="space-y-1.5 pt-2 border-t border-white/5">
        <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">Price Breakdown</div>
        {[
          { label: 'Base Category', value: f.basePriceETB },
          { label: 'Scope Modules', value: f.scopeSubtotalETB },
          { label: 'Complexity Uplift', value: f.complexityModifierETB },
          { label: 'Integration Uplift', value: f.integrationModifierETB },
          { label: 'Strategic Value', value: f.strategicValueUpliftETB },
          { label: 'Urgency Risk', value: f.riskFactorETB },
          { label: 'Premium Position.', value: f.premiumPositioningETB },
          { label: 'Commercial Adj.', value: -f.commercialAdjustmentETB },
        ].filter(i => i.value !== 0).map(item => (
          <div key={item.label} className="flex justify-between items-center text-[10px]">
            <span className="text-white/40">{item.label}</span>
            <span className={`font-mono font-bold ${item.value >= 0 ? 'text-white/60' : 'text-red-400'}`}>
              {item.value >= 0 ? '+' : ''}{item.value.toLocaleString()}
            </span>
          </div>
        ))}
        <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-white/5">
          <span className="text-white/40">Internal Cost</span>
          <span className="font-mono font-bold text-amber-400">{f.totalInternalCostETB.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-white/40">Gross Contribution</span>
          <span className={`font-mono font-bold ${f.estimatedGrossContributionETB >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {f.estimatedGrossContributionETB.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-white/40">Gross Margin</span>
          <span className={`font-mono font-bold text-sm ${f.estimatedGrossMarginPct >= 40 ? 'text-emerald-400' : f.estimatedGrossMarginPct >= 25 ? 'text-amber-400' : 'text-red-400'}`}>
            {f.estimatedGrossMarginPct}%
          </span>
        </div>
      </div>

      {/* Recurring Revenue */}
      {recurringMonthly > 0 && (
        <div className="pt-2 border-t border-white/5">
          <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">+ Recurring Revenue</div>
          <div className="text-lg font-syne font-bold text-purple-400">
            {recurringMonthly.toLocaleString()} <span className="text-[10px] text-white/40">ETB/mo</span>
          </div>
          <div className="text-[9px] text-white/30 font-mono">({(recurringMonthly * 12).toLocaleString()} ETB/yr)</div>
        </div>
      )}

      {/* Premium Positioning Slider */}
      <div className="pt-3 border-t border-white/5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold">
            Premium Uplift
          </label>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
            premiumPct > 0
              ? 'bg-purple-500/20 border-purple-500/30 text-purple-300'
              : 'bg-white/5 border-white/5 text-white/30'
          }`}>
            +{premiumPct}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={40}
          step={5}
          value={premiumPct}
          onChange={e => onPremiumChange(parseInt(e.target.value))}
          className="w-full accent-melhek-blue cursor-pointer"
        />
        <div className="flex justify-between text-[9px] font-mono text-white/20 mt-0.5">
          <span>0%</span><span>20%</span><span>40%</span>
        </div>
        {premiumPct > 0 && (
          <div className="text-[9px] text-purple-400/70 font-mono mt-1">
            +{f.premiumPositioningETB.toLocaleString()} ETB uplift applied
          </div>
        )}
      </div>

      {/* Meta Details */}
      <div className="pt-2 border-t border-white/5 space-y-1.5">
        {[
          { label: 'Division', value: quote.division.split(' & ')[0] },
          { label: 'Tier', value: quote.tier },
          { label: 'Complexity', value: `${f.operationalComplexityScore} / 30` },
          { label: 'Valid For', value: `${quote.validUntilDays} Days` },
          { label: 'Ref', value: quote.id },
        ].map(row => (
          <div key={row.label} className="flex justify-between items-center text-[10px]">
            <span className="text-white/40">{row.label}</span>
            <span className="text-white font-mono font-bold truncate max-w-[120px] text-right">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* PROPOSAL OUTPUT GENERATOR                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
function ProposalOutput({ quote, onClose }: { quote: Quote; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const f = quote.financials;
  const recurringMonthly = getRecurringMonthly(quote);
  const categoryName = getCategoryName(quote.categoryId);
  const selectedRecurring = quote.recurringServices.filter(s => s.selected);
  const selectedScopeItems = PRICING_CATEGORIES
    .find(c => c.id === quote.categoryId)?.defaultScope
    .filter(s => quote.selectedScopeIds.includes(s.id)) ?? [];

  const proposalDate = new Date(quote.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const validUntilDate = new Date(new Date(quote.createdAt).getTime() + quote.validUntilDays * 86400000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const lines = [
    `MELHEK TECHNOLOGIES`,
    `Your Digital Anchor.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `COMMERCIAL PROPOSAL`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `Quote Reference:  ${quote.id}`,
    `Date of Issue:    ${proposalDate}`,
    `Valid Until:      ${validUntilDate}`,
    ``,
    `CLIENT DETAILS`,
    `─────────────────────────────────────────────────`,
    `Business:    ${quote.client.businessName || '—'}`,
    `Contact:     ${quote.client.contactPerson || '—'}`,
    `Industry:    ${quote.client.industry}`,
    `Location:    ${quote.client.location}`,
    ``,
    `PROJECT OVERVIEW`,
    `─────────────────────────────────────────────────`,
    `Division:    ${quote.division}`,
    `System:      ${categoryName}`,
    `Tier:        ${quote.tier}`,
    ...(quote.objectives.length > 0 ? [
      `Objectives:  ${quote.objectives.join(', ')}`,
    ] : []),
    ``,
    `SCOPE OF WORK`,
    `─────────────────────────────────────────────────`,
    ...selectedScopeItems.map(s => `  • ${s.name}`),
    ...quote.customScopeItems.map(s => `  • ${s.name} (Custom)`),
    ``,
    `INVESTMENT`,
    `─────────────────────────────────────────────────`,
    `Total Investment:  ${f.finalNegotiatedPriceETB.toLocaleString()} ETB`,
    `                   (≈ $${Math.round(f.finalNegotiatedPriceETB / 120).toLocaleString()} USD)`,
    ``,
    ...(selectedRecurring.length > 0 ? [
      `RECURRING SERVICES`,
      `─────────────────────────────────────────────────`,
      ...selectedRecurring.map(s => `  • ${s.name}: ${s.priceETB.toLocaleString()} ETB / ${s.cycle}`),
      `  Monthly Subtotal: ${recurringMonthly.toLocaleString()} ETB/month`,
      `  Annual Subtotal:  ${(recurringMonthly * 12).toLocaleString()} ETB/year`,
      ``,
    ] : []),
    `PAYMENT SCHEDULE`,
    `─────────────────────────────────────────────────`,
    ...quote.paymentSchedule.map((m, i) =>
      `  ${i + 1}. ${m.label} — ${m.percentage}% — ${m.amountETB.toLocaleString()} ETB\n     Due: ${m.dueCondition}`
    ),
    ``,
    `TERMS`,
    `─────────────────────────────────────────────────`,
    `• This proposal is valid for ${quote.validUntilDays} calendar days from date of issue.`,
    `• All prices are exclusive of applicable government taxes unless stated.`,
    `• Scope changes after project commencement are subject to separate quotation.`,
    `• Melhek Technologies reserves intellectual property rights over all developed systems.`,
    ``,
    `NEXT STEPS`,
    `─────────────────────────────────────────────────`,
    `1. Review this commercial proposal`,
    `2. Confirm scope and investment`,
    `3. Sign engagement agreement`,
    `4. Commence project with commencement deposit`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Melhek Technologies © ${new Date(quote.createdAt).getFullYear()}`,
    `Addis Ababa, Ethiopia`,
    `melhek.tech`,
  ];

  const fullText = lines.join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.setTimeout(() => window.print(), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-melhek-blue/5">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-melhek-blue" />
          <div>
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Client Proposal — {quote.id}
            </div>
            <div className="text-[10px] text-white/40">
              {quote.client.businessName || 'Unnamed'} · {fmtDate(quote.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 border border-white/10 text-white/60 hover:border-melhek-blue hover:text-white'
            }`}
          >
            {copied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-white/60 hover:border-melhek-blue hover:text-white transition-all"
          >
            <Printer className="w-3 h-3" /> Print
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Proposal Body - Two column */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT — Client-Facing Summary Table */}
        <div className="space-y-4">
          {/* Client */}
          <div className="bg-melhek-navy/60 border border-white/5 rounded-xl p-4 space-y-2">
            <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-2">Client Details</div>
            {[
              { label: 'Business', value: quote.client.businessName || '—' },
              { label: 'Contact', value: quote.client.contactPerson || '—' },
              { label: 'Industry', value: `${quote.client.industry} · ${quote.client.businessSize}` },
              { label: 'Location', value: quote.client.location },
            ].map(row => (
              <div key={row.label} className="flex gap-3 text-[11px]">
                <span className="text-white/40 w-16 shrink-0">{row.label}</span>
                <span className="text-white font-medium">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Project */}
          <div className="bg-melhek-navy/60 border border-white/5 rounded-xl p-4 space-y-2">
            <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-2">Project Details</div>
            {[
              { label: 'Division', value: quote.division },
              { label: 'System', value: categoryName },
              { label: 'Reference', value: quote.id },
              { label: 'Valid Until', value: validUntilDate },
            ].map(row => (
              <div key={row.label} className="flex gap-3 text-[11px]">
                <span className="text-white/40 w-16 shrink-0">{row.label}</span>
                <span className="text-white font-medium truncate">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Deliverables */}
          <div className="bg-melhek-navy/60 border border-white/5 rounded-xl p-4">
            <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-3">Scope of Work</div>
            <div className="space-y-1.5">
              {selectedScopeItems.map(s => (
                <div key={s.id} className="flex items-start gap-2 text-[11px]">
                  <CheckSquare className="w-3 h-3 text-melhek-blue shrink-0 mt-0.5" />
                  <span className="text-white/80">{s.name}</span>
                </div>
              ))}
              {quote.customScopeItems.map((s, i) => (
                <div key={`custom-${i}`} className="flex items-start gap-2 text-[11px]">
                  <CheckSquare className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">{s.name} <span className="text-amber-400/60">(Custom)</span></span>
                </div>
              ))}
              {selectedScopeItems.length === 0 && quote.customScopeItems.length === 0 && (
                <div className="text-[11px] text-white/30 italic">No scope items selected yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — Investment + Payment + Recurring */}
        <div className="space-y-4">
          {/* Investment Hero */}
          <div className="bg-melhek-blue/10 border border-melhek-blue/20 rounded-xl p-5 text-center">
            <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest mb-2">Total Investment</div>
            <div className="text-3xl font-syne font-extrabold text-white">
              {f.finalNegotiatedPriceETB.toLocaleString()}
            </div>
            <div className="text-sm text-melhek-steel/70 font-mono mb-3">Ethiopian Birr (ETB)</div>
            <div className="text-[11px] text-white/40 font-mono">
              ≈ USD ${Math.round(f.finalNegotiatedPriceETB / 120).toLocaleString()}
            </div>
          </div>

          {/* Payment Schedule */}
          {quote.paymentSchedule.length > 0 && (
            <div className="bg-melhek-navy/60 border border-white/5 rounded-xl p-4">
              <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-3">Payment Milestones</div>
              <div className="space-y-2.5">
                {quote.paymentSchedule.map((m, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-melhek-blue/20 text-melhek-blue font-mono font-bold text-[9px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">{m.label}</div>
                        <div className="text-[10px] text-white/40 leading-tight mt-0.5">{m.dueCondition}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-melhek-blue">{m.amountETB.toLocaleString()} ETB</div>
                      <div className="text-[9px] text-white/30">{m.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recurring Services */}
          {selectedRecurring.length > 0 && (
            <div className="bg-melhek-navy/60 border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold">Recurring Services</div>
                <div className="text-xs font-syne font-bold text-purple-400">
                  {recurringMonthly.toLocaleString()} ETB/mo
                </div>
              </div>
              <div className="space-y-2">
                {selectedRecurring.map(s => (
                  <div key={s.id} className="flex items-center justify-between text-[11px]">
                    <span className="text-white/70">{s.name}</span>
                    <span className="font-mono text-white/60">{s.priceETB.toLocaleString()} ETB/{s.cycle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms & Conditions — Professional client-facing block */}
          <div className="bg-melhek-navy/40 border border-white/5 rounded-xl p-4 space-y-2">
            <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-2">Proposal Terms</div>
            {[
              'This proposal is valid for ' + quote.validUntilDays + ' calendar days from the date of issue.',
              'All prices are quoted in Ethiopian Birr (ETB) and are exclusive of applicable government taxes.',
              'Scope changes requested after project commencement are subject to separate change-order quotation.',
              'Melhek Technologies retains intellectual property rights over all custom-developed systems until final payment is received.',
              'A signed engagement agreement and commencement deposit are required to initiate the project.',
            ].map((term, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px] text-white/50 leading-relaxed">
                <span className="text-melhek-blue shrink-0 font-mono font-bold">{i + 1}.</span>
                <span>{term}</span>
              </div>
            ))}
          </div>

          {/* Melhek Signature Block */}
          <div className="border-t border-white/5 pt-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-white">Melhek Technologies</div>
              <div className="text-[9px] text-white/40 font-mono">Addis Ababa, Ethiopia · melhek.tech</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-melhek-blue font-bold">Your Digital Anchor.</div>
              <div className="text-[9px] text-white/30 font-mono">© {new Date().getFullYear()} Melhek Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* QUOTE LIST SIDEBAR                                                          */
/* ═══════════════════════════════════════════════════════════════════════════ */
function QuoteListPanel({
  quotes,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onDuplicate,
  onStatusChange,
}: {
  quotes: Quote[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onStatusChange: (id: string, status: QuoteStatus) => void;
}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<QuoteStatus | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let q = quotes;
    if (filterStatus !== 'All') q = q.filter(x => x.status === filterStatus);
    if (search.trim()) {
      const s = search.toLowerCase();
      q = q.filter(x =>
        x.id.toLowerCase().includes(s) ||
        x.client.businessName.toLowerCase().includes(s) ||
        x.client.contactPerson.toLowerCase().includes(s) ||
        getCategoryName(x.categoryId).toLowerCase().includes(s)
      );
    }
    return q;
  }, [quotes, search, filterStatus]);

  return (
    <div className="glass rounded-2xl border border-white/10 p-4 space-y-3 bg-white/[0.01]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
          Quotes ({quotes.length})
        </div>
        <button
          onClick={onNew}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-melhek-blue text-melhek-navy rounded-lg text-[10px] font-mono font-bold hover:bg-melhek-steel transition-colors"
        >
          <Plus className="w-3 h-3" /> New
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search quotes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-melhek-navy/80 border border-white/10 rounded-lg pl-7 pr-3 py-1.5 text-[10px] text-white placeholder-white/30 focus:border-melhek-blue outline-none font-mono transition-all"
        />
      </div>

      {/* Filter Toggle */}
      <div>
        <button
          onClick={() => setShowFilters(p => !p)}
          className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 hover:text-white transition-colors"
        >
          <Filter className="w-3 h-3" />
          Filter by status
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 flex flex-wrap gap-1"
            >
              {(['All', ...ALL_STATUSES] as (QuoteStatus | 'All')[]).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono border transition-all ${
                    filterStatus === s
                      ? 'bg-melhek-blue/20 border-melhek-blue text-melhek-blue font-bold'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                  }`}
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quote Cards */}
      <div className="space-y-2 max-h-[calc(100vh-420px)] overflow-y-auto custom-scrollbar pr-1">
        {filtered.length === 0 && (
          <div className="text-center text-white/30 text-[11px] py-6 font-mono">
            {search || filterStatus !== 'All' ? 'No matching quotes.' : 'No quotes yet.\nClick New to begin.'}
          </div>
        )}
        {filtered.map(q => (
          <div
            key={q.id}
            onClick={() => onSelect(q.id)}
            className={`p-3 rounded-xl border cursor-pointer transition-all group relative ${
              q.id === activeId
                ? 'bg-melhek-blue/15 border-melhek-blue shadow-[0_0_15px_rgba(127,169,255,0.08)]'
                : 'bg-melhek-navy/60 border-white/5 hover:border-white/20 hover:bg-melhek-navy/80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono font-bold text-melhek-blue truncate max-w-[80px]">{q.id}</span>
              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${STATUS_STYLES[q.status]}`}>
                {q.status}
              </span>
            </div>
            <div className="text-[11px] font-bold text-white truncate">
              {q.client.businessName || 'Unnamed Client'}
            </div>
            <div className="text-[9px] text-white/40 truncate mt-0.5">
              {getCategoryName(q.categoryId)}
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[10px] font-mono font-bold text-melhek-blue">
                {fmt(q.financials.finalNegotiatedPriceETB)}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={e => { e.stopPropagation(); onDuplicate(q.id); }}
                  className="p-1 text-white/30 hover:text-melhek-blue transition-colors"
                  title="Duplicate quote"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); onDelete(q.id); }}
                  className="p-1 text-white/30 hover:text-red-400 transition-colors"
                  title="Delete quote"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            {/* Quick status change on hover */}
            {q.id === activeId && q.status === 'Sent' && (
              <div className="mt-2 pt-2 border-t border-white/5 flex gap-1" onClick={e => e.stopPropagation()}>
                <button
                  onClick={e => { e.stopPropagation(); onStatusChange(q.id, 'Accepted'); }}
                  className="flex-1 py-1 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors"
                >✓ Accept</button>
                <button
                  onClick={e => { e.stopPropagation(); onStatusChange(q.id, 'Rejected'); }}
                  className="flex-1 py-1 text-[9px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
                >✕ Reject</button>
              </div>
            )}
            {q.financials.isBelowMinimumSafe && (
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" title="Below minimum safe price" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* QUOTE BUILDER (post-auth inner engine)                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
function QuoteBuilder({ onLogout }: { onLogout: () => void }) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [activeQuoteId, setActiveQuoteId] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [saved, setSaved] = useState(false);

  /* Load quotes on mount */
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = getLocalQuotes();
      if (stored.length > 0) {
        setQuotes(stored);
        setActiveQuoteId(stored[0].id);
      } else {
        const blank = createBlankQuote();
        const savedQuote = saveLocalQuote(blank);
        setQuotes([savedQuote]);
        setActiveQuoteId(savedQuote.id);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const activeQuote = quotes.find(q => q.id === activeQuoteId);

  /* Recalculate financials + persist on every field change */
  const updateQuote = useCallback((updater: (q: Quote) => Partial<Quote>) => {
    setQuotes(prev => prev.map(q => {
      if (q.id !== activeQuoteId) return q;
      const patch = updater(q);
      const merged: Quote = { ...q, ...patch };
      const financials = calculateQuoteFinancials(merged);
      const insights = generateQuoteInsights(merged, financials);
      const paymentSchedule = (patch.paymentSchedule ?? merged.paymentSchedule).map(m => ({
        ...m,
        amountETB: Math.round(financials.finalNegotiatedPriceETB * (m.percentage / 100))
      }));
      const final: Quote = { ...merged, financials, insights, paymentSchedule };
      saveLocalQuote(final);
      return final;
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [activeQuoteId]);

  const handleNewQuote = () => {
    const blank = createBlankQuote();
    const s = saveLocalQuote(blank);
    setQuotes(prev => [s, ...prev]);
    setActiveQuoteId(s.id);
    setCurrentStep(1);
    setShowProposal(false);
  };

  const handleSelectQuote = (id: string) => {
    setActiveQuoteId(id);
    setCurrentStep(1);
    setShowProposal(false);
  };

  const handleDeleteQuote = (id: string) => {
    deleteLocalQuote(id);
    const remaining = quotes.filter(q => q.id !== id);
    setQuotes(remaining);
    if (id === activeQuoteId) {
      if (remaining.length > 0) {
        setActiveQuoteId(remaining[0].id);
      } else {
        handleNewQuote();
      }
    }
  };

  const handleDuplicateQuote = (id: string) => {
    const original = quotes.find(q => q.id === id);
    if (!original) return;
    const duplicate: Quote = {
      ...original,
      id: generateQuoteId(),
      status: 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      client: {
        ...original.client,
        businessName: `${original.client.businessName} (Copy)`,
      },
    };
    const saved = saveLocalQuote(duplicate);
    setQuotes(prev => [saved, ...prev]);
    setActiveQuoteId(saved.id);
    setCurrentStep(1);
  };

  const handleStatusChange = (status: QuoteStatus) => {
    updateQuote(() => ({ status }));
  };

  const metrics = calculateDashboardMetrics(quotes);

  if (!activeQuote) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-melhek-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-melhek-dark">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-melhek-blue mb-0.5">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] font-bold">
                Melhek Technologies — Internal Commercial Desk
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-syne font-extrabold text-white tracking-tight">
              Quote Builder
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Auto-saved
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={handleNewQuote}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-melhek-blue text-melhek-navy text-xs font-mono font-bold hover:bg-melhek-steel transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New Quote
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white hover:border-white/30 transition-all font-mono"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock
            </button>
          </div>
        </div>

        {/* ── DASHBOARD METRICS ── */}
        <DashboardHeader
          metrics={metrics}
          isCollapsed={isDashboardCollapsed}
          onToggleCollapse={() => setIsDashboardCollapsed(p => !p)}
        />

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

          {/* LEFT: Quote Library */}
          <div className="xl:col-span-2">
            <QuoteListPanel
              quotes={quotes}
              activeId={activeQuoteId}
              onSelect={handleSelectQuote}
              onNew={handleNewQuote}
              onDelete={handleDeleteQuote}
              onDuplicate={handleDuplicateQuote}
              onStatusChange={(id, status) => {
                setQuotes(prev => prev.map(q => {
                  if (q.id !== id) return q;
                  const updated = { ...q, status };
                  saveLocalQuote(updated);
                  return updated;
                }));
              }}
            />
          </div>

          {/* CENTER: Step Wizard */}
          <div className="xl:col-span-7 space-y-4">

            {/* Active Quote Status Bar */}
            <div className="glass rounded-2xl border border-white/10 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/50">
                  <Clock className="w-3 h-3 text-melhek-blue" />
                  <span>{fmtDate(activeQuote.updatedAt)}</span>
                </div>
                <div className="w-px h-3.5 bg-white/10" />
                <div className="text-[11px] font-mono font-bold text-melhek-blue truncate max-w-[200px]">
                  {activeQuote.client.businessName || 'Unnamed Quote'} · {activeQuote.id}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={activeQuote.status}
                  onChange={e => handleStatusChange(e.target.value as QuoteStatus)}
                  className={`bg-melhek-navy border rounded-lg px-2 py-1 text-[10px] font-mono outline-none cursor-pointer transition-all ${STATUS_STYLES[activeQuote.status]}`}
                >
                  {ALL_STATUSES.map(s => (
                    <option key={s} value={s} className="bg-melhek-navy text-white">{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleDuplicateQuote(activeQuote.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-all"
                  title="Duplicate this quote"
                >
                  <Copy className="w-3 h-3" /> Clone
                </button>
                <button
                  onClick={() => setShowProposal(p => !p)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    showProposal
                      ? 'bg-melhek-blue text-melhek-navy'
                      : 'bg-melhek-blue/10 border border-melhek-blue/30 text-melhek-blue hover:bg-melhek-blue hover:text-melhek-navy'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  {showProposal ? 'Close Proposal' : 'Open Proposal'}
                </button>
              </div>
            </div>

            {/* Step Navigation */}
            <QuoteStepNavigation
              currentStep={currentStep}
              onSelectStep={setCurrentStep}
            />

            {/* Step Content Panel */}
            <div className="glass rounded-2xl border border-white/10 p-5 md:p-7 bg-white/[0.01] min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                >
                  {currentStep === 1 && (
                    <StepClient
                      client={activeQuote.client}
                      onChange={updated => updateQuote(() => ({ client: updated }))}
                    />
                  )}
                  {currentStep === 2 && (
                    <StepProject
                      division={activeQuote.division}
                      categoryId={activeQuote.categoryId}
                      tier={activeQuote.tier}
                      objectives={activeQuote.objectives}
                      onCategoryChange={(catId, div) => updateQuote(q => {
                        const newScopeIds = PRICING_CATEGORIES.find(c => c.id === catId)?.defaultScope
                          .slice(0, 5).map(s => s.id) ?? q.selectedScopeIds;
                        const newCosts = estimateDefaultLaborHours(catId, newScopeIds, q.complexity);
                        return {
                          categoryId: catId,
                          division: div,
                          selectedScopeIds: newScopeIds,
                          internalCosts: newCosts,
                        };
                      })}
                      onTierChange={tier => updateQuote(() => ({ tier }))}
                      onObjectivesChange={objectives => updateQuote(() => ({ objectives }))}
                    />
                  )}
                  {currentStep === 3 && (
                    <StepScope
                      categoryId={activeQuote.categoryId}
                      selectedScopeIds={activeQuote.selectedScopeIds}
                      customScopeItems={activeQuote.customScopeItems}
                      onScopeChange={ids => updateQuote(() => ({ selectedScopeIds: ids }))}
                      onCustomScopeChange={items => updateQuote(() => ({ customScopeItems: items }))}
                    />
                  )}
                  {currentStep === 4 && (
                    <StepComplexity
                      complexity={activeQuote.complexity}
                      operationalComplexityScore={activeQuote.financials.operationalComplexityScore}
                      onChange={complexity => updateQuote(() => ({ complexity }))}
                    />
                  )}
                  {currentStep === 5 && (
                    <StepCommercial
                      commercial={activeQuote.commercial}
                      costs={activeQuote.internalCosts}
                      recommendedPriceETB={activeQuote.financials.recommendedPriceETB}
                      minimumSafePriceETB={activeQuote.financials.minimumSafePriceETB}
                      finalPriceETB={activeQuote.financials.finalNegotiatedPriceETB}
                      onCommercialChange={commercial => updateQuote(() => ({ commercial }))}
                      onCostsChange={internalCosts => updateQuote(() => ({ internalCosts }))}
                    />
                  )}
                  {currentStep === 6 && (
                    <StepRecurring
                      recurringServices={activeQuote.recurringServices}
                      onChange={recurringServices => updateQuote(() => ({ recurringServices }))}
                    />
                  )}
                  {currentStep === 7 && (
                    <StepPayment
                      finalPriceETB={activeQuote.financials.finalNegotiatedPriceETB}
                      paymentSchedule={activeQuote.paymentSchedule}
                      validUntilDays={activeQuote.validUntilDays}
                      onScheduleChange={paymentSchedule => updateQuote(() => ({ paymentSchedule }))}
                      onValidDaysChange={validUntilDays => updateQuote(() => ({ validUntilDays }))}
                      onGenerateProposal={() => setCurrentStep(8)}
                    />
                  )}
                  {currentStep === 8 && (
                    <StepReview
                      quote={activeQuote}
                      onGenerateProposal={() => setShowProposal(true)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Step Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/5">
                <button
                  onClick={() => setCurrentStep(p => Math.max(1, p - 1))}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white/50 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-colors border border-white/5 hover:border-white/20"
                >
                  ← Back
                </button>
                <span className="text-[10px] font-mono text-white/30">
                  Step {currentStep} / 8 · {activeQuote.id}
                </span>
                {currentStep < 8 ? (
                  <button
                    onClick={() => setCurrentStep(p => Math.min(8, p + 1))}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-melhek-blue text-melhek-navy hover:bg-melhek-steel transition-colors"
                  >
                    {currentStep === 7 ? (
                      <><BookOpen className="w-3.5 h-3.5" /> Review Quote</>
                    ) : 'Next →'}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowProposal(true)}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-melhek-blue text-melhek-navy hover:bg-melhek-steel transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> Generate Proposal
                  </button>
                )}
              </div>
            </div>

            {/* PROPOSAL OUTPUT */}
            <AnimatePresence>
              {showProposal && (
                <ProposalOutput
                  quote={activeQuote}
                  onClose={() => setShowProposal(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Live Price Panel */}
          <div className="xl:col-span-3">
            <LivePricePanel
              quote={activeQuote}
              onPremiumChange={(pct) => updateQuote(q => ({
                commercial: { ...q.commercial, premiumPositioningUpliftPct: pct }
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ROOT — Access is verified by the server before this component is rendered.  */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function FounderPricingDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    fetch('/api/pricing/auth', { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error('Logout failed');
        router.refresh();
      })
      .catch(() => window.alert('Could not end the session. Check your connection and try again.'));
  };

  return <QuoteBuilder onLogout={handleLogout} />;
}
