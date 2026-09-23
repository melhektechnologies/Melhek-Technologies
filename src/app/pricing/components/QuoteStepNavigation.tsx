'use client';

import { User, Layers, Boxes, Cpu, DollarSign, RefreshCw, CreditCard, Check } from 'lucide-react';

export const QUOTE_STEPS = [
  { id: 1, label: 'Client', icon: User, desc: 'Lead & Business Info' },
  { id: 2, label: 'Project', icon: Layers, desc: 'Category & Tier' },
  { id: 3, label: 'Scope', icon: Boxes, desc: 'Modules & Deliverables' },
  { id: 4, label: 'Complexity', icon: Cpu, desc: 'Technical Scale' },
  { id: 5, label: 'Commercials', icon: DollarSign, desc: 'Value & Margins' },
  { id: 6, label: 'Recurring', icon: RefreshCw, desc: 'SLA & Support' },
  { id: 7, label: 'Payment', icon: CreditCard, desc: 'Milestones & Terms' }
];

interface QuoteStepNavigationProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export default function QuoteStepNavigation({ currentStep, onSelectStep }: QuoteStepNavigationProps) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-2 mb-6 overflow-x-auto">
      <div className="flex items-center min-w-[650px] justify-between gap-1">
        {QUOTE_STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left ${
                isActive
                  ? 'bg-melhek-blue/15 border border-melhek-blue/40 text-white shadow-[0_0_20px_rgba(127,169,255,0.15)]'
                  : isDone
                  ? 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/5'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                  isActive
                    ? 'bg-melhek-blue text-navy'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>

              <div className="hidden sm:block overflow-hidden">
                <div className={`text-xs font-mono font-bold leading-none ${isActive ? 'text-melhek-blue' : 'text-white'}`}>
                  0{step.id}. {step.label}
                </div>
                <div className="text-[10px] text-white/40 truncate font-sans mt-1">
                  {step.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
