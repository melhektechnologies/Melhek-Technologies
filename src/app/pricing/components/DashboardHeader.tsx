'use client';

import { SalesDashboardMetrics } from '@/lib/pricing/types';
import { TrendingUp, FileText, CheckCircle, Percent, DollarSign, Clock } from 'lucide-react';

interface DashboardHeaderProps {
  metrics: SalesDashboardMetrics;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function DashboardHeader({ metrics, isCollapsed, onToggleCollapse }: DashboardHeaderProps) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-4 mb-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-melhek-blue" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
            Melhek Sales OS — Commercial Pipeline Metrics
          </h3>
        </div>
        <button
          onClick={onToggleCollapse}
          className="text-[10px] font-mono text-white/50 hover:text-melhek-blue px-2 py-0.5 rounded bg-white/5 border border-white/10 transition-colors"
        >
          {isCollapsed ? 'Expand Dashboard ▲' : 'Collapse ▼'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          <div className="bg-navy/80 border border-white/5 rounded-xl p-3">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="text-[10px] font-mono uppercase">Quotes This Month</span>
              <FileText className="w-3.5 h-3.5 text-melhek-blue" />
            </div>
            <div className="text-lg font-syne font-extrabold text-white">
              {metrics.quotesThisMonth}
            </div>
          </div>

          <div className="bg-navy/80 border border-white/5 rounded-xl p-3">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="text-[10px] font-mono uppercase">Total Quoted Value</span>
              <DollarSign className="w-3.5 h-3.5 text-melhek-steel" />
            </div>
            <div className="text-sm md:text-base font-syne font-extrabold text-melhek-blue truncate">
              {metrics.totalQuotedValueETB.toLocaleString()} <span className="text-[9px] font-mono text-white/40">ETB</span>
            </div>
          </div>

          <div className="bg-navy/80 border border-white/5 rounded-xl p-3">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="text-[10px] font-mono uppercase">Accepted Value</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-sm md:text-base font-syne font-extrabold text-emerald-400 truncate">
              {metrics.acceptedValueETB.toLocaleString()} <span className="text-[9px] font-mono text-white/40">ETB</span>
            </div>
          </div>

          <div className="bg-navy/80 border border-white/5 rounded-xl p-3">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="text-[10px] font-mono uppercase">Average Quote</span>
              <TrendingUp className="w-3.5 h-3.5 text-melhek-blue" />
            </div>
            <div className="text-sm md:text-base font-syne font-extrabold text-white truncate">
              {metrics.averageQuoteValueETB.toLocaleString()} <span className="text-[9px] font-mono text-white/40">ETB</span>
            </div>
          </div>

          <div className="bg-navy/80 border border-white/5 rounded-xl p-3">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="text-[10px] font-mono uppercase">Win Rate</span>
              <Percent className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-syne font-extrabold text-white">
              {metrics.conversionRatePct}%
            </div>
          </div>

          <div className="bg-navy/80 border border-white/5 rounded-xl p-3">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="text-[10px] font-mono uppercase">Pending Desk</span>
              <Clock className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg font-syne font-extrabold text-purple-300">
              {metrics.pendingQuotesCount}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
