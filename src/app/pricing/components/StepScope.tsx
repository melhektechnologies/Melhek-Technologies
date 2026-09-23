'use client';

import { useState } from 'react';
import { ProjectCategoryId, ScopeItem } from '@/lib/pricing/types';
import { PRICING_CATEGORIES } from '@/lib/pricing/pricingConfig';
import { getRecommendedFeatures } from '@/lib/pricing/pricingEngine';
import { Boxes, Sparkles, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface StepScopeProps {
  categoryId: ProjectCategoryId;
  selectedScopeIds: string[];
  customScopeItems: Array<{ name: string; priceETB: number }>;
  onScopeChange: (selectedIds: string[]) => void;
  onCustomScopeChange: (items: Array<{ name: string; priceETB: number }>) => void;
}

export default function StepScope({
  categoryId,
  selectedScopeIds,
  customScopeItems,
  onScopeChange,
  onCustomScopeChange
}: StepScopeProps) {
  const currentCategory = PRICING_CATEGORIES.find((c) => c.id === categoryId) || PRICING_CATEGORIES[0];
  const [newCustomName, setNewCustomName] = useState('');
  const [newCustomPrice, setNewCustomPrice] = useState('');

  const recommendedItems = getRecommendedFeatures(selectedScopeIds, categoryId);

  const toggleScopeItem = (id: string) => {
    if (selectedScopeIds.includes(id)) {
      onScopeChange(selectedScopeIds.filter((item) => item !== id));
    } else {
      onScopeChange([...selectedScopeIds, id]);
    }
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomName.trim()) return;
    const price = parseInt(newCustomPrice) || 0;
    onCustomScopeChange([...customScopeItems, { name: newCustomName.trim(), priceETB: price }]);
    setNewCustomName('');
    setNewCustomPrice('');
  };

  const handleRemoveCustomItem = (index: number) => {
    onCustomScopeChange(customScopeItems.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
          <Boxes className="w-5 h-5 text-melhek-blue" />
          Step 03 — Dynamic Scope & Functional Modules
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Select functional deliverables for <span className="text-melhek-blue font-bold">{currentCategory.name}</span>.
        </p>
      </div>

      {/* Recommended Feature Dependencies Alert */}
      {recommendedItems.length > 0 && (
        <div className="bg-melhek-blue/10 border border-melhek-blue/30 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-melhek-blue text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Recommended Additions (Feature Dependency Intelligence)
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed">
            Based on your selected workflow modules, the engine recommends adding these supporting capabilities:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {recommendedItems.map((rec) => (
              <div
                key={rec.id}
                className="bg-navy/90 border border-melhek-blue/20 rounded-xl p-2.5 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{rec.name}</div>
                  <div className="text-[10px] text-melhek-blue/80">{rec.recommendedReason}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleScopeItem(rec.id)}
                  className="px-2.5 py-1 bg-melhek-blue text-navy font-mono font-bold text-[10px] rounded-lg hover:bg-white transition-colors"
                >
                  + Add (+{rec.basePriceETB.toLocaleString()} ETB)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scope Module Selection Matrix */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider">
            Category Functional Deliverables ({selectedScopeIds.length} / {currentCategory.defaultScope.length} selected)
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onScopeChange(currentCategory.defaultScope.map((s) => s.id))}
              className="text-[10px] font-mono text-melhek-blue hover:underline"
            >
              Select All
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => onScopeChange([])}
              className="text-[10px] font-mono text-white/40 hover:text-white"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentCategory.defaultScope.map((item) => {
            const isSelected = selectedScopeIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleScopeItem(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-melhek-blue/15 border-melhek-blue text-white shadow-[0_0_15px_rgba(127,169,255,0.15)]'
                    : 'bg-navy/80 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                        isSelected ? 'bg-melhek-blue border-melhek-blue text-navy' : 'border-white/20'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                    <span className="text-xs font-bold font-syne text-white">{item.name}</span>
                  </div>
                  <p className="text-[11px] text-white/40 leading-relaxed pl-6">{item.description}</p>
                </div>

                <span className="text-xs font-mono font-bold text-melhek-blue shrink-0">
                  +{item.basePriceETB.toLocaleString()} ETB
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Scope Adder */}
      <div className="pt-3 border-t border-white/5">
        <label className="block text-xs font-mono font-bold text-melhek-blue uppercase tracking-wider mb-2">
          Custom Ad-Hoc Scope Deliverables
        </label>

        <form onSubmit={handleAddCustomItem} className="flex flex-wrap gap-2 mb-3">
          <input
            type="text"
            placeholder="Custom deliverable name (e.g., Specialized CBE Direct Webhook)..."
            value={newCustomName}
            onChange={(e) => setNewCustomName(e.target.value)}
            className="flex-1 min-w-[200px] bg-navy/90 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-white/20 focus:border-melhek-blue outline-none"
          />
          <input
            type="number"
            placeholder="Price (ETB)"
            value={newCustomPrice}
            onChange={(e) => setNewCustomPrice(e.target.value)}
            className="w-32 bg-navy/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:border-melhek-blue outline-none"
          />
          <button
            type="submit"
            className="btn-secondary !py-2 !px-4 text-xs font-mono font-bold"
          >
            <Plus className="w-3.5 h-3.5" /> Add Scope Item
          </button>
        </form>

        {customScopeItems.length > 0 && (
          <div className="space-y-2">
            {customScopeItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-navy/80 border border-white/10 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-melhek-blue" />
                  <span className="text-xs font-bold text-white">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-melhek-blue">
                    +{item.priceETB.toLocaleString()} ETB
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomItem(idx)}
                    className="text-white/40 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
