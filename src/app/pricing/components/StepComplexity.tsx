'use client';

import {
  ComplexityConfig,
  DesignComplexity,
  TechnicalComplexity,
  IntegrationComplexity,
  DataComplexity,
  UserComplexity,
  SecurityRequirement,
  DeploymentType
} from '@/lib/pricing/types';
import { COMPLEXITY_MODIFIERS } from '@/lib/pricing/pricingConfig';
import { Cpu, Palette, Code2, Share2, Database, Users, Shield, Server } from 'lucide-react';

interface StepComplexityProps {
  complexity: ComplexityConfig;
  operationalComplexityScore: number;
  onChange: (updated: ComplexityConfig) => void;
}

export default function StepComplexity({
  complexity,
  operationalComplexityScore,
  onChange
}: StepComplexityProps) {
  const handleChange = (key: keyof ComplexityConfig, value: any) => {
    onChange({
      ...complexity,
      [key]: value
    });
  };

  const getScoreBadgeColor = (score: number) => {
    if (score <= 5) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (score <= 11) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (score <= 18) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-melhek-blue" />
            Step 04 — Implementation Scale & Complexity Matrix
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Fine-tune architectural parameters. These calculate internal complexity uplift & safeguard delivery effort.
          </p>
        </div>

        <div className={`px-4 py-2 rounded-2xl border ${getScoreBadgeColor(operationalComplexityScore)} text-right shrink-0`}>
          <div className="text-[10px] font-mono uppercase tracking-wider">Complexity Score</div>
          <div className="text-lg font-syne font-extrabold">{operationalComplexityScore} / 30</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Design Complexity */}
        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Palette className="w-4 h-4" /> Design & UI/UX Complexity
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Standard', 'Professional', 'Premium', 'Highly Custom'] as DesignComplexity[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange('design', opt)}
                className={`p-2.5 rounded-xl text-left border text-xs font-mono transition-all ${
                  complexity.design === opt
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Complexity */}
        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Code2 className="w-4 h-4" /> Technical & Algorithmic Scale
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Low', 'Medium', 'High', 'Very High'] as TechnicalComplexity[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange('technical', opt)}
                className={`p-2.5 rounded-xl text-left border text-xs font-mono transition-all ${
                  complexity.technical === opt
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Complexity */}
        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Share2 className="w-4 h-4" /> API & External Integration Depth
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['None', 'Basic', 'Multiple', 'Advanced'] as IntegrationComplexity[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange('integration', opt)}
                className={`p-2.5 rounded-xl text-left border text-xs font-mono transition-all ${
                  complexity.integration === opt
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Data Complexity */}
        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Database className="w-4 h-4" /> Legacy Data Migration & Dataset Scale
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Simple', 'Existing data migration', 'Large dataset', 'Complex migration'] as DataComplexity[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange('data', opt)}
                className={`p-2 rounded-xl text-left border text-[11px] font-mono transition-all ${
                  complexity.data === opt
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* User Multi-Role Scale */}
        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Users className="w-4 h-4" /> User Concurrency & Multi-Branch Scale
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Single user', 'Small team', 'Multi-role', 'Multi-branch', 'Enterprise'] as UserComplexity[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange('user', opt)}
                className={`p-2 rounded-xl text-left border text-[11px] font-mono transition-all ${
                  complexity.user === opt
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Security Requirement */}
        <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
            <Shield className="w-4 h-4" /> Security & Field Encryption Protocol
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Standard', 'Enhanced', 'High', 'Enterprise'] as SecurityRequirement[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange('security', opt)}
                className={`p-2.5 rounded-xl text-left border text-xs font-mono transition-all ${
                  complexity.security === opt
                    ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deployment Architecture */}
      <div className="bg-navy/80 border border-white/10 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-mono font-bold text-melhek-blue flex items-center gap-1.5 uppercase">
          <Server className="w-4 h-4" /> Cloud & Infrastructure Deployment Target
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['Standard deployment', 'Custom infrastructure', 'Advanced deployment'] as DeploymentType[]).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleChange('deployment', opt)}
              className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                complexity.deployment === opt
                  ? 'bg-melhek-blue/20 border-melhek-blue text-white font-bold'
                  : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
