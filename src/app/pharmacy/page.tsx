import { Activity, AlertTriangle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";
import { aiInsights, dashboardKpis, medicineData, salesData } from "@/lib/pharmacy/demo-data";

export default function PharmacyDashboardPage() {
  return (
    <PharmacyShell
      title="Enterprise Pharmacy Dashboard"
      subtitle="Live overview of sales, stock risk, branch health, and AI-informed operational signals."
    >
      <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {dashboardKpis.map((kpi) => (
          <article key={kpi.title} className="rounded-3xl border border-[#dce8ff] bg-white p-5 shadow-[0_10px_30px_rgba(18,77,160,0.08)]">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6a8ac0] font-semibold">{kpi.title}</p>
            <div className="flex items-end justify-between mt-3">
              <h3 className="text-3xl font-semibold text-[#102c59]">{kpi.value}</h3>
              <ArrowUpRight className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-sm mt-2 text-[#6182b8]">{kpi.delta}</p>
          </article>
        ))}
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-6">
        <section className="rounded-3xl border border-[#dce8ff] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#102c59] mb-5">Recent Transactions</h2>
          <div className="space-y-3">
            {salesData.map((tx) => (
              <div key={tx.id} className="rounded-2xl border border-[#e8efff] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#143263]">{tx.invoiceNo}</p>
                  <p className="text-sm text-[#5c79ac]">{tx.cashier} • {tx.paymentMethod}</p>
                </div>
                <p className="font-semibold text-[#0f2b58]">ETB {tx.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#dce8ff] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#102c59] mb-5">Live Risk Panel</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 rounded-2xl bg-[#f8fbff] border border-[#e5eeff] p-4">
              <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-500" />
              <p className="text-[#47689f]">{medicineData.filter((m) => m.status === "low").length} SKUs crossed reorder level.</p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-[#f8fbff] border border-[#e5eeff] p-4">
              <Activity className="w-4 h-4 mt-0.5 text-cyan-600" />
              <p className="text-[#47689f]">24/7 sync active for POS, batches, and branch movement.</p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-[#f8fbff] border border-[#e5eeff] p-4">
              <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-600" />
              <p className="text-[#47689f]">RBAC + audit trail healthy. No unresolved security incidents.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-[#dce8ff] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#102c59] mb-5">AI Business Insights</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {aiInsights.map((insight) => (
            <article key={insight} className="rounded-2xl border border-[#e7efff] bg-[#f9fbff] p-4 text-[#38598e] text-sm leading-relaxed">
              {insight}
            </article>
          ))}
        </div>
      </section>
    </PharmacyShell>
  );
}
