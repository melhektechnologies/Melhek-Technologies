'use client';

import {
  CommercialFactors,
  InternalCostEstimation,
  UrgencyLevel,
  ProjectTimeline,
  StrategicClientValue,
  RelationshipType
} from '@/lib/pricing/types';
import { DollarSign, Clock, Wrench, AlertTriangle, TrendingUp, Star } from 'lucide-react';

interface StepCommercialProps {
  commercial: CommercialFactors;
  costs: InternalCostEstimation;
  recommendedPriceETB: number;
  minimumSafePriceETB: number;
  finalPriceETB: number;
  onCommercialChange: (updated: CommercialFactors) => void;
  onCostsChange: (updated: InternalCostEstimation) => void;
}

export default function StepCommercial({
  commercial,
  costs,
  recommendedPriceETB,
  minimumSafePriceETB,
  finalPriceETB,
  onCommercialChange,
  onCostsChange
}: StepCommercialProps) {
  const handleCommercialChange = (field: keyof CommercialFactors, value: CommercialFactors[keyof CommercialFactors]) => {
    onCommercialChange({ ...commercial, [field]: value });
  };

  const handleCostsChange = (field: keyof InternalCostEstimation, value: number) => {
    onCostsChange({ ...costs, [field]: value });
  };

  const isBelowMin = finalPriceETB < minimumSafePriceETB;
  const premiumPct = commercial.premiumPositioningUpliftPct ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-melhek-blue" />
          Step 05 — Commercial Modifiers & Internal Cost Estimator
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Adjust market parameters, urgency factor, and internal labor hours to protect gross margin.
        </p>
      </div>

      {/* Commercial Market Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Clock className="w-3.5 h-3.5" /> Project Urgency Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Normal', 'Priority', 'Urgent'] as UrgencyLevel[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => handleCommercialChange('urgency', u)}
                className={`py-2 px-2 rounded-xl text-xs font-mono text-center border transition-all ${
                  commercial.urgency === u
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/30">
            Priority +20% · Urgent +40% risk premium applied
          </p>
        </div>

        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Clock className="w-3.5 h-3.5" /> Estimated Delivery Timeline
          </label>
          <select
            value={commercial.timeline}
            onChange={(e) => handleCommercialChange('timeline', e.target.value as ProjectTimeline)}
            className="w-full bg-navy border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-melhek-blue"
          >
            {(['2 weeks', '1 month', '2 months', '3 months', '6+ months'] as ProjectTimeline[]).map((t) => (
              <option key={t} value={t} className="bg-melhek-navy text-white">{t}</option>
            ))}
          </select>
        </div>

        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <TrendingUp className="w-3.5 h-3.5" /> Strategic Client Value
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['Low', 'Moderate', 'High', 'Strategic'] as StrategicClientValue[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => handleCommercialChange('strategicValue', v)}
                className={`py-2 px-1 rounded-xl text-[11px] font-mono text-center border transition-all ${
                  commercial.strategicValue === v
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            Relationship Status
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['New Client', 'Returning Client', 'Strategic Partner'] as RelationshipType[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleCommercialChange('relationship', r)}
                className={`py-2 px-1 rounded-xl text-[10px] font-mono text-center border transition-all truncate ${
                  commercial.relationship === r
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/30">
            Strategic Partner −5% relationship modifier applied
          </p>
        </div>
      </div>

      {/* Premium Positioning Uplift */}
      <div className="bg-navy/80 border border-purple-500/20 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Star className="w-3.5 h-3.5 text-purple-400" /> Premium Positioning Uplift
          </label>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
            premiumPct > 0
              ? 'bg-purple-500/20 border-purple-500/30 text-purple-300'
              : 'bg-white/5 border-white/5 text-white/30'
          }`}>
            +{premiumPct}%
          </span>
        </div>
        <p className="text-[11px] text-white/40 leading-relaxed">
          Apply when your solution delivers exceptional business value, market exclusivity, or transforms client operations at scale. Not a discount layer — this is a value signal.
        </p>
        <input
          type="range"
          min={0}
          max={40}
          step={5}
          value={premiumPct}
          onChange={e => handleCommercialChange('premiumPositioningUpliftPct', parseInt(e.target.value))}
          className="w-full accent-purple-500 cursor-pointer"
        />
        <div className="flex justify-between text-[9px] font-mono text-white/20">
          <span>0% — Fair Market</span>
          <span>20% — Premium</span>
          <span>40% — Elite Tier</span>
        </div>
        {/* Quick Preset Buttons */}
        <div className="flex gap-2 flex-wrap pt-1 border-t border-white/5">
          {[
            { label: 'Standard', pct: 0 },
            { label: '+10%', pct: 10 },
            { label: '+15%', pct: 15 },
            { label: '+20%', pct: 20 },
            { label: '+25%', pct: 25 },
            { label: '+30%', pct: 30 },
          ].map(({ label, pct }) => (
            <button
              key={pct}
              type="button"
              onClick={() => handleCommercialChange('premiumPositioningUpliftPct', pct)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                premiumPct === pct
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 font-bold'
                  : 'bg-white/5 border-white/10 text-white/50 hover:border-white/25 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {premiumPct > 0 && (
          <div className="text-[10px] font-mono text-purple-400/80">
            +{Math.round(recommendedPriceETB * premiumPct / 100).toLocaleString()} ETB premium uplift will be applied to final price
          </div>
        )}
      </div>

      {/* Founder Commercial Adjustments */}
      <div className="bg-navy/90 border border-white/10 rounded-2xl p-4 space-y-4">
        <label className="text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider block">
          Founder Commercial Discount & Justification
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/70 mb-1">
              Discount Amount (ETB) — deducted from final price
            </label>
            <input
              type="number"
              placeholder="e.g. 10000"
              value={commercial.commercialAdjustmentETB || ''}
              onChange={(e) => handleCommercialChange('commercialAdjustmentETB', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-melhek-blue"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Justification (required for discounts &gt; 10%)
            </label>
            <input
              type="text"
              placeholder="e.g. Strategic partner discount / multi-project bundle..."
              value={commercial.adjustmentReason}
              onChange={(e) => handleCommercialChange('adjustmentReason', e.target.value)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-melhek-blue"
            />
          </div>
        </div>

        {/* Guardrail Warning Banner */}
        {isBelowMin && (
          <div className="bg-red-500/15 border border-red-500/40 rounded-xl p-3.5 flex items-start gap-3 text-red-200 text-xs">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold font-mono uppercase text-red-300">
                ⚠ COMMERCIAL GUARDRAIL — MARGIN PROTECTION
              </div>
              <p className="mt-0.5 leading-relaxed">
                Final price ({finalPriceETB.toLocaleString()} ETB) is below the Minimum Safe Floor ({minimumSafePriceETB.toLocaleString()} ETB).
                Reduce scope, increase final price, or document exceptional justification before proceeding.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Internal Labor Hours Estimation */}
      <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
          <Wrench className="w-4 h-4" /> Internal Labor & External Costs (Founder Internal View Only)
        </label>
        <p className="text-[11px] text-white/40">
          Actual team hours required to deliver this engagement. Used to calculate internal cost and minimum safe margin. Auto-estimated from scope — adjust as needed.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
          {[
            { key: 'designHours' as const, label: 'UI/UX Design', value: costs.designHours },
            { key: 'developmentHours' as const, label: 'Development', value: costs.developmentHours },
            { key: 'testingHours' as const, label: 'Testing / QA', value: costs.testingHours },
            { key: 'deploymentHours' as const, label: 'Deployment', value: costs.deploymentHours },
            { key: 'projectManagementHours' as const, label: 'Proj. Mgmt', value: costs.projectManagementHours },
          ].map(({ key, label, value }) => (
            <div key={key}>
              <label className="block text-[10px] font-mono text-white/60 mb-1">{label} hrs</label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleCostsChange(key, parseInt(e.target.value) || 0)}
                className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
          <div>
            <label className="block text-[10px] font-mono text-white/60 mb-1">
              Internal Hourly Rate (ETB/hr)
            </label>
            <input
              type="number"
              value={costs.hourlyInternalRateETB}
              onChange={(e) => handleCostsChange('hourlyInternalRateETB', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-white/60 mb-1">
              Direct External Costs (API / Hosting / Domain ETB)
            </label>
            <input
              type="number"
              value={costs.thirdPartyCostsETB}
              onChange={(e) => handleCostsChange('thirdPartyCostsETB', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
            />
          </div>
        </div>

        {/* Summary row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/40">
            Total Hours: {(costs.designHours || 0) + (costs.developmentHours || 0) + (costs.testingHours || 0) + (costs.deploymentHours || 0) + (costs.projectManagementHours || 0)} hrs
          </span>
          <span className="text-[10px] font-mono text-amber-400 font-bold">
            Labor Cost: {(((costs.designHours || 0) + (costs.developmentHours || 0) + (costs.testingHours || 0) + (costs.deploymentHours || 0) + (costs.projectManagementHours || 0)) * (costs.hourlyInternalRateETB || 0)).toLocaleString()} ETB
          </span>
        </div>
      </div>
    </div>
  );
}
