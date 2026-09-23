'use client';

import {
  CommercialFactors,
  InternalCostEstimation,
  UrgencyLevel,
  ProjectTimeline,
  StrategicClientValue,
  RelationshipType
} from '@/lib/pricing/types';
import { DollarSign, Clock, ShieldAlert, Wrench, AlertTriangle, TrendingUp } from 'lucide-react';

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
  const handleCommercialChange = (field: keyof CommercialFactors, value: any) => {
    onCommercialChange({
      ...commercial,
      [field]: value
    });
  };

  const handleCostsChange = (field: keyof InternalCostEstimation, value: number) => {
    onCostsChange({
      ...costs,
      [field]: value
    });
  };

  const isBelowMin = finalPriceETB < minimumSafePriceETB;

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
              <option key={t} value={t} className="bg-melhek-navy text-white">
                {t}
              </option>
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
        </div>
      </div>

      {/* Founder Commercial Adjustments */}
      <div className="bg-navy/90 border border-white/10 rounded-2xl p-4 space-y-4">
        <label className="text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider block">
          Founder Commercial Price Adjustment & Premium Uplift
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/70 mb-1">
              Commercial Adjustment / Discount (ETB)
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
              Adjustment Justification Reason
            </label>
            <input
              type="text"
              placeholder="e.g. Strategic partner discount / multi-project bundle"
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
                ⚠ COMMERCIAL GUARDRAIL WARNING
              </div>
              <p className="mt-0.5 leading-relaxed">
                Final negotiated price ({finalPriceETB.toLocaleString()} ETB) is below Melhek&apos;s Minimum Safe Floor ({minimumSafePriceETB.toLocaleString()} ETB). Review internal labor effort or commercial terms.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Internal Labor Hours Estimation */}
      <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
          <Wrench className="w-4 h-4" /> Internal Labor & External Costs (Founder Internal View)
        </label>
        <p className="text-[11px] text-white/40">
          These fields estimate actual team execution hours to calculate internal cost and minimum safe margins.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
          <div>
            <label className="block text-[10px] font-mono text-white/60 mb-1">UI/UX Design Hours</label>
            <input
              type="number"
              value={costs.designHours}
              onChange={(e) => handleCostsChange('designHours', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-white/60 mb-1">Development Hours</label>
            <input
              type="number"
              value={costs.developmentHours}
              onChange={(e) => handleCostsChange('developmentHours', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-white/60 mb-1">Testing Hours</label>
            <input
              type="number"
              value={costs.testingHours}
              onChange={(e) => handleCostsChange('testingHours', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-white/60 mb-1">Deployment Hours</label>
            <input
              type="number"
              value={costs.deploymentHours}
              onChange={(e) => handleCostsChange('deploymentHours', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-white/60 mb-1">Project Mgmt Hours</label>
            <input
              type="number"
              value={costs.projectManagementHours}
              onChange={(e) => handleCostsChange('projectManagementHours', parseInt(e.target.value) || 0)}
              className="w-full bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue"
            />
          </div>
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
      </div>
    </div>
  );
}
