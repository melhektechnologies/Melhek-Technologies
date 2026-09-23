'use client';

import { PaymentScheduleMilestone } from '@/lib/pricing/types';
import { CreditCard, FileCheck, CheckCircle2, Shield } from 'lucide-react';

interface StepPaymentProps {
  finalPriceETB: number;
  paymentSchedule: PaymentScheduleMilestone[];
  validUntilDays: number;
  onScheduleChange: (updated: PaymentScheduleMilestone[]) => void;
  onValidDaysChange: (days: number) => void;
  onGenerateProposal: () => void;
}

const PRESET_PLANS = [
  {
    name: 'Standard 50 / 30 / 20',
    schedule: [
      { label: 'Commencement Deposit', percentage: 50, dueCondition: 'Upon signing engagement agreement & project kickoff' },
      { label: 'Milestone / Beta Review', percentage: 30, dueCondition: 'Upon user acceptance testing & staging review' },
      { label: 'Final Delivery & Handover', percentage: 20, dueCondition: 'Upon production deployment & handover' }
    ]
  },
  {
    name: 'Enterprise 40 / 40 / 20',
    schedule: [
      { label: 'Commencement Deposit', percentage: 40, dueCondition: 'Upon signing engagement agreement & architectural signoff' },
      { label: 'Phase 1 Core Integration', percentage: 40, dueCondition: 'Upon delivery of core database & operational APIs' },
      { label: 'Final Handover & SLA', percentage: 20, dueCondition: 'Upon final security audit & staff training completion' }
    ]
  },
  {
    name: 'Upfront 60 / 40',
    schedule: [
      { label: 'Initial Kickoff Deposit', percentage: 60, dueCondition: 'Upon signing engagement agreement' },
      { label: 'Final Production Launch', percentage: 40, dueCondition: 'Upon final deployment & domain mapping' }
    ]
  }
];

export default function StepPayment({
  finalPriceETB,
  paymentSchedule,
  validUntilDays,
  onScheduleChange,
  onValidDaysChange,
  onGenerateProposal
}: StepPaymentProps) {
  const applyPreset = (presetSchedule: typeof PRESET_PLANS[0]['schedule']) => {
    const updated = presetSchedule.map((m) => ({
      ...m,
      amountETB: Math.round(finalPriceETB * (m.percentage / 100))
    }));
    onScheduleChange(updated);
  };

  const handlePercentageChange = (index: number, newPct: number) => {
    const updated = [...paymentSchedule];
    updated[index] = {
      ...updated[index],
      percentage: newPct,
      amountETB: Math.round(finalPriceETB * (newPct / 100))
    };
    onScheduleChange(updated);
  };

  const handleConditionChange = (index: number, condition: string) => {
    const updated = [...paymentSchedule];
    updated[index] = {
      ...updated[index],
      dueCondition: condition
    };
    onScheduleChange(updated);
  };

  const totalPercentage = paymentSchedule.reduce((sum, m) => sum + m.percentage, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-melhek-blue" />
            Step 07 — Commercial Payment Schedule & Proposal Terms
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Configure payment milestones and proposal validity period for the client proposal.
          </p>
        </div>

        <button
          type="button"
          onClick={onGenerateProposal}
          className="btn-primary !py-2.5 !px-5 text-xs uppercase font-mono tracking-wider shadow-lg"
        >
          <FileCheck className="w-4 h-4" /> Generate Client Proposal →
        </button>
      </div>

      {/* Preset Plan Selectors */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider">
          Quick Payment Schedule Presets
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_PLANS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset.schedule)}
              className="p-3 rounded-xl bg-navy/80 border border-white/10 hover:border-melhek-blue hover:text-white text-left text-xs font-mono transition-all text-white/70"
            >
              <div className="font-bold text-white">{preset.name}</div>
              <div className="text-[10px] text-white/40 mt-1">
                {preset.schedule.map((s) => `${s.percentage}%`).join(' / ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Milestone Breakdown Matrix */}
      <div className="bg-navy/90 border border-white/10 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Milestone Financial Distribution (Total: {finalPriceETB.toLocaleString()} ETB)
          </label>
          <span
            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
              totalPercentage === 100
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {totalPercentage}% Allocated
          </span>
        </div>

        <div className="space-y-3">
          {paymentSchedule.map((milestone, idx) => {
            const calculatedAmount = Math.round(finalPriceETB * (milestone.percentage / 100));
            return (
              <div key={idx} className="bg-navy/70 border border-white/10 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-melhek-blue/20 text-melhek-blue font-mono font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white font-syne">{milestone.label}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={milestone.percentage}
                        onChange={(e) => handlePercentageChange(idx, parseInt(e.target.value) || 0)}
                        className="w-16 bg-navy border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-center text-white outline-none focus:border-melhek-blue"
                      />
                      <span className="text-xs text-white/50">%</span>
                    </div>

                    <div className="text-xs font-mono font-bold text-melhek-blue min-w-[110px] text-right">
                      {calculatedAmount.toLocaleString()} ETB
                    </div>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={milestone.dueCondition}
                    onChange={(e) => handleConditionChange(idx, e.target.value)}
                    placeholder="Due condition trigger..."
                    className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white/80 placeholder-white/20 outline-none focus:border-melhek-blue"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Proposal Terms */}
      <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <label className="block text-xs font-mono font-bold text-white mb-1">
            Proposal Lock Validity Duration
          </label>
          <p className="text-[11px] text-white/40">
            Number of calendar days this commercial proposal quote remains valid.
          </p>
        </div>

        <select
          value={validUntilDays}
          onChange={(e) => onValidDaysChange(parseInt(e.target.value) || 30)}
          className="bg-navy border border-white/15 rounded-xl px-4 py-2 text-xs font-mono text-white outline-none focus:border-melhek-blue"
        >
          <option value={14}>14 Days</option>
          <option value={30}>30 Days (Standard)</option>
          <option value={45}>45 Days</option>
          <option value={60}>60 Days</option>
        </select>
      </div>
    </div>
  );
}
