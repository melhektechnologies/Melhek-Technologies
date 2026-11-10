'use client';

import { Quote } from '@/lib/pricing/types';
import { PRICING_CATEGORIES } from '@/lib/pricing/pricingConfig';
import {
  CheckCircle2, AlertTriangle, AlertCircle, Info, Sparkles,
  Building, Layers, DollarSign, RefreshCw, Clock, Shield, Star,
  TrendingUp, FileCheck, Zap
} from 'lucide-react';

interface StepReviewProps {
  quote: Quote;
  onGenerateProposal: () => void;
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

export default function StepReview({ quote, onGenerateProposal }: StepReviewProps) {
  const f = quote.financials;
  const category = PRICING_CATEGORIES.find(c => c.id === quote.categoryId);
  const selectedScope = category?.defaultScope.filter(s => quote.selectedScopeIds.includes(s.id)) ?? [];
  const recurringSelected = quote.recurringServices.filter(s => s.selected);
  const monthlyRecurring = recurringSelected.reduce((sum, s) => {
    if (s.cycle === 'Annual') return sum + Math.round(s.priceETB / 12);
    if (s.cycle === 'Quarterly') return sum + Math.round(s.priceETB / 3);
    return sum + s.priceETB;
  }, 0);

  const isWarn = f.isBelowMinimumSafe;
  const isBelowRec = f.isSubstantiallyBelowRecommended;
  const isPremium = f.isPremiumPositioned;
  const isGood = !isWarn && !isBelowRec;

  const insightIconMap = {
    warning: <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
    info: <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
    opportunity: <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
    success: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  };

  const insightColorMap = {
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-200',
    opportunity: 'bg-purple-500/10 border-purple-500/20 text-purple-200',
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-melhek-blue" />
            Step 08 — Quote Review & Proposal Readiness
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Final internal review of the complete commercial package before generating the client proposal.
          </p>
        </div>
        <button
          type="button"
          onClick={onGenerateProposal}
          className="btn-primary !py-2.5 !px-5 text-xs uppercase font-mono tracking-wider shadow-lg shrink-0"
        >
          <Zap className="w-4 h-4" /> Generate Proposal →
        </button>
      </div>

      {/* Commercial Status Banner */}
      <div className={`rounded-2xl p-4 border flex items-start gap-4 ${
        isWarn ? 'bg-red-500/10 border-red-500/25' :
        isBelowRec ? 'bg-amber-500/10 border-amber-500/25' :
        isPremium ? 'bg-purple-500/10 border-purple-500/25' :
        'bg-emerald-500/10 border-emerald-500/25'
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          isWarn ? 'bg-red-500/20' : isBelowRec ? 'bg-amber-500/20' : isPremium ? 'bg-purple-500/20' : 'bg-emerald-500/20'
        }`}>
          {isWarn ? <AlertTriangle className="w-5 h-5 text-red-400" /> :
           isBelowRec ? <AlertCircle className="w-5 h-5 text-amber-400" /> :
           isPremium ? <Star className="w-5 h-5 text-purple-300" /> :
           <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        </div>
        <div>
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isWarn ? 'text-red-300' : isBelowRec ? 'text-amber-300' : isPremium ? 'text-purple-300' : 'text-emerald-300'
          }`}>
            {isWarn ? 'MARGIN PROTECTION WARNING' :
             isBelowRec ? 'BELOW RECOMMENDED RANGE' :
             isPremium ? 'PREMIUM POSITIONING ACTIVE' :
             'COMMERCIAL GUARDRAIL PASSED'}
          </div>
          <p className="text-xs text-white/60 mt-1 leading-relaxed">
            {isWarn && `Final price (${f.finalNegotiatedPriceETB.toLocaleString()} ETB) is below Melhek's minimum safe floor (${f.minimumSafePriceETB.toLocaleString()} ETB). Gross margin: ${f.estimatedGrossMarginPct}%.`}
            {isBelowRec && !isWarn && `Price (${f.finalNegotiatedPriceETB.toLocaleString()} ETB) is below recommendation (${f.recommendedPriceETB.toLocaleString()} ETB). Ensure commercial justification is documented.`}
            {isPremium && `Final price of ${f.finalNegotiatedPriceETB.toLocaleString()} ETB reflects exceptional scope delivery and strategic positioning.`}
            {isGood && !isPremium && `Healthy ${f.estimatedGrossMarginPct}% gross margin. Commercial guardrail passed. Proposal is ready.`}
          </p>
        </div>
      </div>

      {/* 3-Column Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Column 1 — Client & Project */}
        <div className="space-y-3">
          <div className="bg-melhek-navy/70 border border-white/8 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-2">
              <Building className="w-3 h-3" /> Client Profile
            </div>
            {[
              { label: 'Business', value: quote.client.businessName || '—' },
              { label: 'Contact', value: quote.client.contactPerson || '—' },
              { label: 'Industry', value: quote.client.industry },
              { label: 'Size', value: quote.client.businessSize },
              { label: 'Location', value: quote.client.location },
              { label: 'Value Driver', value: quote.client.primaryValue },
              { label: 'Lead Source', value: quote.client.leadSource },
              { label: 'Client Status', value: quote.client.isExistingClient ? 'Existing' : 'New' },
            ].map(row => (
              <div key={row.label} className="flex gap-3 text-[11px]">
                <span className="text-white/35 w-20 shrink-0 font-mono">{row.label}</span>
                <span className="text-white/85 font-medium truncate">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-melhek-navy/70 border border-white/8 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-2">
              <Layers className="w-3 h-3" /> Project Classification
            </div>
            {[
              { label: 'Division', value: quote.division.replace('Melhek ', '') },
              { label: 'Category', value: category?.name ?? quote.categoryId },
              { label: 'Tier', value: quote.tier },
              { label: 'Timeline', value: quote.commercial.timeline },
              { label: 'Urgency', value: quote.commercial.urgency },
              { label: 'Quote Ref', value: quote.id },
              { label: 'Valid', value: `${quote.validUntilDays} days` },
            ].map(row => (
              <div key={row.label} className="flex gap-3 text-[11px]">
                <span className="text-white/35 w-20 shrink-0 font-mono">{row.label}</span>
                <span className="text-white/85 font-medium truncate">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 — Scope & Complexity */}
        <div className="space-y-3">
          <div className="bg-melhek-navy/70 border border-white/8 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold">
                Scope ({selectedScope.length + quote.customScopeItems.length} items)
              </div>
              <span className="text-[9px] font-mono text-white/30">
                +{f.scopeSubtotalETB.toLocaleString()} ETB
              </span>
            </div>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
              {selectedScope.map(s => (
                <div key={s.id} className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-melhek-blue shrink-0 mt-0.5" />
                  <span className="text-white/70">{s.name}</span>
                </div>
              ))}
              {quote.customScopeItems.map((s, i) => (
                <div key={`c-${i}`} className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/70">{s.name} <span className="text-amber-400/60">(Custom)</span></span>
                </div>
              ))}
              {selectedScope.length === 0 && quote.customScopeItems.length === 0 && (
                <p className="text-[11px] text-white/30 italic">No scope items selected.</p>
              )}
            </div>
          </div>

          <div className="bg-melhek-navy/70 border border-white/8 rounded-2xl p-4 space-y-2">
            <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
              <Shield className="w-3 h-3" /> Implementation Complexity
            </div>
            {[
              { label: 'Design', value: quote.complexity.design },
              { label: 'Technical', value: quote.complexity.technical },
              { label: 'Integration', value: quote.complexity.integration },
              { label: 'Data', value: quote.complexity.data },
              { label: 'User Scale', value: quote.complexity.user },
              { label: 'Security', value: quote.complexity.security },
              { label: 'Deployment', value: quote.complexity.deployment },
            ].map(row => (
              <div key={row.label} className="flex gap-3 text-[11px]">
                <span className="text-white/35 w-20 shrink-0 font-mono">{row.label}</span>
                <span className="text-white/85 font-medium truncate">{row.value}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/40">Complexity Score</span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
                f.operationalComplexityScore >= 15 ? 'text-red-300 bg-red-500/10 border-red-500/20' :
                f.operationalComplexityScore >= 9 ? 'text-amber-300 bg-amber-500/10 border-amber-500/20' :
                'text-emerald-300 bg-emerald-500/10 border-emerald-500/20'
              }`}>{f.operationalComplexityScore} / 30</span>
            </div>
          </div>
        </div>

        {/* Column 3 — Financials & Recurring */}
        <div className="space-y-3">
          {/* Price Stack */}
          <div className="bg-melhek-blue/8 border border-melhek-blue/20 rounded-2xl p-4 space-y-3">
            <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold flex items-center gap-1.5">
              <DollarSign className="w-3 h-3" /> Commercial Financial Summary
            </div>

            {[
              { label: 'Estimated Cost', value: f.totalInternalCostETB, color: 'text-amber-400', note: '(Internal Only)' },
              { label: 'Min Safe Price', value: f.minimumSafePriceETB, color: 'text-red-400', note: '' },
              { label: 'Recommended', value: f.recommendedPriceETB, color: 'text-melhek-blue', note: '' },
              { label: 'Premium Opp.', value: f.premiumOpportunityPriceETB, color: 'text-purple-300', note: '' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between text-[11px]">
                <span className="text-white/40">{row.label} <span className="text-white/20 text-[9px]">{row.note}</span></span>
                <span className={`font-mono font-bold ${row.color}`}>{fmt(row.value)} ETB</span>
              </div>
            ))}

            {/* Final Price Hero */}
            <div className={`mt-2 pt-3 border-t border-white/10 rounded-xl p-3 text-center ${
              isWarn ? 'bg-red-500/10 border border-red-500/20' :
              isBelowRec ? 'bg-amber-500/10 border border-amber-500/20' :
              'bg-melhek-blue/10 border border-melhek-blue/20'
            }`}>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Final Negotiated Price</div>
              <div className={`text-2xl font-syne font-extrabold mt-1 ${
                isWarn ? 'text-red-400' : isBelowRec ? 'text-amber-400' : 'text-white'
              }`}>
                {f.finalNegotiatedPriceETB.toLocaleString()}
              </div>
              <div className="text-[10px] font-mono text-white/40">ETB (≈ ${Math.round(f.finalNegotiatedPriceETB / 120).toLocaleString()} USD)</div>
            </div>

            {/* Margin */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-white/40">Gross Contribution</span>
              <span className={`font-mono font-bold ${f.estimatedGrossContributionETB >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {fmt(f.estimatedGrossContributionETB)} ETB
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white/40">Gross Margin</span>
              <span className={`font-mono font-bold text-sm ${
                f.estimatedGrossMarginPct >= 40 ? 'text-emerald-400' :
                f.estimatedGrossMarginPct >= 25 ? 'text-amber-400' : 'text-red-400'
              }`}>{f.estimatedGrossMarginPct}%</span>
            </div>
          </div>

          {/* Recurring */}
          {monthlyRecurring > 0 && (
            <div className="bg-melhek-navy/70 border border-white/8 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3" /> Recurring Revenue
                </div>
                <span className="text-sm font-syne font-bold text-purple-300">
                  {monthlyRecurring.toLocaleString()} ETB/mo
                </span>
              </div>
              <div className="space-y-1.5">
                {recurringSelected.map(s => (
                  <div key={s.id} className="flex items-center justify-between text-[11px]">
                    <span className="text-white/60 truncate max-w-[140px]">{s.name}</span>
                    <span className="font-mono text-white/50 shrink-0 ml-2">{s.priceETB.toLocaleString()} ETB/{s.cycle.toLowerCase().slice(0, 2)}</span>
                  </div>
                ))}
              </div>
              <div className="text-[9px] text-white/30 font-mono mt-2 pt-2 border-t border-white/5">
                Annual recurring: {(monthlyRecurring * 12).toLocaleString()} ETB/yr
              </div>
            </div>
          )}

          {/* Payment Schedule */}
          {quote.paymentSchedule.length > 0 && (
            <div className="bg-melhek-navy/70 border border-white/8 rounded-2xl p-4">
              <div className="text-[9px] font-mono text-melhek-blue uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Payment Schedule
              </div>
              {quote.paymentSchedule.map((m, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] py-1.5 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-melhek-blue/20 text-melhek-blue font-mono font-bold text-[9px] flex items-center justify-center">{i + 1}</span>
                    <span className="text-white/60">{m.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-melhek-blue text-xs">{m.amountETB.toLocaleString()} ETB</div>
                    <div className="text-[9px] text-white/30">{m.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Insights Panel */}
      {quote.insights.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-melhek-blue" />
            <span className="text-xs font-mono font-bold text-melhek-blue uppercase tracking-widest">
              Internal Intelligence ({quote.insights.length} insights)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quote.insights.map((ins, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border ${insightColorMap[ins.type]}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {insightIconMap[ins.type]}
                  <span className="text-[11px] font-mono font-bold">{ins.title}</span>
                </div>
                <p className="text-[11px] opacity-70 leading-relaxed">{ins.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Commercial Adjustment Notes */}
      {quote.commercial.adjustmentReason && (
        <div className="bg-melhek-navy/60 border border-white/8 rounded-2xl p-4 text-[11px]">
          <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1">Commercial Adjustment Note</div>
          <p className="text-white/60 italic">&quot;{quote.commercial.adjustmentReason}&quot;</p>
          {quote.commercial.commercialAdjustmentETB > 0 && (
            <span className="mt-1 inline-block text-red-400 font-mono font-bold">
              −{quote.commercial.commercialAdjustmentETB.toLocaleString()} ETB
            </span>
          )}
        </div>
      )}

      {/* Internal Notes */}
      {quote.client.notes && (
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold uppercase text-[9px] tracking-widest mb-1">
            <AlertCircle className="w-3 h-3" /> Internal Discovery Notes (Confidential — Not in Proposal)
          </div>
          <p className="text-white/50 leading-relaxed">{quote.client.notes}</p>
        </div>
      )}

      {/* Final CTA */}
      <div className="pt-2 flex items-center justify-center">
        <button
          type="button"
          onClick={onGenerateProposal}
          className="btn-primary !py-4 !px-10 text-sm uppercase font-mono tracking-widest shadow-2xl shadow-melhek-blue/20"
        >
          <Zap className="w-4 h-4" /> Generate Client Proposal →
        </button>
      </div>
    </div>
  );
}
