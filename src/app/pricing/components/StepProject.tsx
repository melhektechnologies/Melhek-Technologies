'use client';

import { ProjectDivision, ProjectCategoryId, ProjectTier } from '@/lib/pricing/types';
import { PRICING_CATEGORIES, PRICING_TIER_CONFIG } from '@/lib/pricing/pricingConfig';
import { Layers, ShieldCheck, Check } from 'lucide-react';

interface StepProjectProps {
  division: ProjectDivision;
  categoryId: ProjectCategoryId;
  tier: ProjectTier;
  objectives: string[];
  onCategoryChange: (catId: ProjectCategoryId, newDivision: ProjectDivision) => void;
  onTierChange: (tier: ProjectTier) => void;
  onObjectivesChange: (objectives: string[]) => void;
}

const DIVISIONS: ProjectDivision[] = [
  'Melhek Digital & AI Labs',
  'Melhek Hospitality & Business Systems',
  'Melhek Enterprise Solutions',
  'Melhek Infrastructure & Cloud'
];

export default function StepProject({
  division,
  categoryId,
  tier,
  objectives,
  onCategoryChange,
  onTierChange,
  onObjectivesChange
}: StepProjectProps) {
  const currentCategory = PRICING_CATEGORIES.find((c) => c.id === categoryId) || PRICING_CATEGORIES[0];

  const handleSelectCategory = (cat: (typeof PRICING_CATEGORIES)[0]) => {
    onCategoryChange(cat.id, cat.division);
  };

  const toggleObjective = (obj: string) => {
    if (objectives.includes(obj)) {
      onObjectivesChange(objectives.filter((o) => o !== obj));
    } else {
      onObjectivesChange([...objectives, obj]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-melhek-blue" />
          Step 02 — Project Classification & Execution Tier
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Select the core technical category and internal implementation tier.
        </p>
      </div>

      {/* Division & Category Grid */}
      <div>
        <label className="block text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider mb-2">
          01. Select Project Category (14 Supported Systems)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRICING_CATEGORIES.map((cat) => {
            const isSelected = cat.id === categoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`p-3.5 rounded-2xl text-left border transition-all relative flex flex-col justify-between h-[130px] ${
                  isSelected
                    ? 'bg-melhek-blue/15 border-melhek-blue text-white shadow-[0_0_20px_rgba(127,169,255,0.2)]'
                    : 'bg-navy/80 border-white/10 text-white/70 hover:border-white/20 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-melhek-blue font-bold uppercase truncate max-w-[170px]">
                      {cat.division}
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      ~{cat.basePriceETB.toLocaleString()} ETB
                    </span>
                  </div>
                  <h4 className="text-sm font-bold font-syne text-white mt-1">{cat.name}</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-melhek-blue text-navy flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal Tier Matrix */}
      <div className="pt-2 border-t border-white/5">
        <label className="block text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> 02. Internal Project Tier (System Scope Scale)
        </label>
        <p className="text-[11px] text-white/40 mb-3">
          Tiers adjust the overall labor allocation & structural multiplier. They represent internal scale and are not shown directly to clients as cheap/expensive tiers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(['FOUNDATION', 'PROFESSIONAL', 'ADVANCED', 'ENTERPRISE'] as ProjectTier[]).map((t) => {
            const isSelected = tier === t;
            const config = PRICING_TIER_CONFIG[t];
            return (
              <button
                key={t}
                type="button"
                onClick={() => onTierChange(t)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-melhek-blue/15 border-melhek-blue text-white shadow-[0_0_20px_rgba(127,169,255,0.25)]'
                    : 'bg-navy/80 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold tracking-wider text-melhek-blue">
                    {config.name}
                  </span>
                  <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                    {config.multiplier}x
                  </span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed mt-1">{config.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Objectives Selection */}
      <div className="pt-2 border-t border-white/5">
        <label className="block text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider mb-2">
          03. Target Project Objectives (Context for Proposal Deliverables)
        </label>
        <div className="flex flex-wrap gap-2">
          {currentCategory.commonObjectives.map((obj) => {
            const isSelected = objectives.includes(obj);
            return (
              <button
                key={obj}
                type="button"
                onClick={() => toggleObjective(obj)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  isSelected
                    ? 'bg-melhek-blue text-navy font-bold border-melhek-blue'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}
                {obj}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
