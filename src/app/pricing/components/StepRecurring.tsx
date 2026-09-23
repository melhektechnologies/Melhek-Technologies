'use client';

import { RecurringServiceItem, BillingCycle } from '@/lib/pricing/types';
import { RefreshCw, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface StepRecurringProps {
  recurringServices: RecurringServiceItem[];
  onChange: (updated: RecurringServiceItem[]) => void;
}

export default function StepRecurring({ recurringServices, onChange }: StepRecurringProps) {
  const toggleService = (id: string) => {
    onChange(
      recurringServices.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const updateCycle = (id: string, cycle: BillingCycle) => {
    onChange(
      recurringServices.map((s) => (s.id === id ? { ...s, cycle } : s))
    );
  };

  const selectedServices = recurringServices.filter((s) => s.selected);
  const monthlyTotalETB = selectedServices.reduce((sum, s) => {
    if (s.cycle === 'Annual') return sum + Math.round(s.priceETB / 12);
    if (s.cycle === 'Quarterly') return sum + Math.round(s.priceETB / 3);
    return sum + s.priceETB;
  }, 0);

  const annualTotalETB = monthlyTotalETB * 12;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-melhek-blue" />
            Step 06 — Recurring Revenue & Managed Service SLAs
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Separate one-time software build investment from recurring support, hosting, and SLA maintenance.
          </p>
        </div>

        <div className="bg-melhek-blue/15 border border-melhek-blue/30 rounded-2xl p-3 text-right shrink-0">
          <div className="text-[10px] font-mono text-melhek-blue uppercase font-bold">Recurring Subtotal</div>
          <div className="text-base font-syne font-extrabold text-white">
            {monthlyTotalETB.toLocaleString()} <span className="text-[10px] font-mono text-white/50">ETB/mo</span>
          </div>
          <div className="text-[10px] font-mono text-white/40">
            ({annualTotalETB.toLocaleString()} ETB/yr)
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recurringServices.map((service) => {
          const isSelected = service.selected;
          return (
            <div
              key={service.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-melhek-blue/10 border-melhek-blue text-white shadow-[0_0_15px_rgba(127,169,255,0.15)]'
                  : 'bg-navy/80 border-white/10 text-white/60 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center text-xs shrink-0 transition-colors ${
                    isSelected ? 'bg-melhek-blue border-melhek-blue text-navy font-bold' : 'border-white/20'
                  }`}
                >
                  {isSelected && '✓'}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-syne text-white">{service.name}</span>
                    {isSelected && (
                      <span className="text-[9px] font-mono bg-melhek-blue/20 text-melhek-blue px-2 py-0.5 rounded border border-melhek-blue/30">
                        Active SLA
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{service.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                <select
                  value={service.cycle}
                  onChange={(e) => updateCycle(service.id, e.target.value as BillingCycle)}
                  disabled={!isSelected}
                  className="bg-navy border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-melhek-blue disabled:opacity-40"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual (Prepaid)</option>
                </select>

                <div className="text-right font-mono font-bold text-sm text-melhek-blue min-w-[100px]">
                  {service.priceETB.toLocaleString()} ETB
                  <div className="text-[9px] text-white/40 font-normal">/{service.cycle.toLowerCase()}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
