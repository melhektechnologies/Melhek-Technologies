import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";
import { branchData } from "@/lib/pharmacy/demo-data";

export default function BranchesPage() {
  return (
    <PharmacyShell
      title="Multi-Branch Control"
      subtitle="Centralized orchestration across pharmacy branches with health, revenue, and stock sync visibility."
    >
      <div className="grid lg:grid-cols-3 gap-4">
        {branchData.map((b) => (
          <article key={b.id} className="rounded-3xl border border-[#dce8ff] bg-white p-5">
            <p className="text-xs uppercase tracking-widest text-[#6e8ec2]">{b.code}</p>
            <h3 className="text-xl font-semibold text-[#143263] mt-2">{b.name}</h3>
            <p className="text-sm text-[#5d7aab] mt-1">{b.city} • Manager: {b.manager}</p>
            <div className="mt-4 space-y-1 text-sm text-[#4f6fa6]">
              <p>Daily revenue: ETB {b.dailyRevenue.toLocaleString()}</p>
              <p>Stock health: {b.stockHealth}%</p>
              <p>Status: {b.status}</p>
            </div>
          </article>
        ))}
      </div>
    </PharmacyShell>
  );
}
