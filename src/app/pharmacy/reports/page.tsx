import { Download } from "lucide-react";
import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";

const reportTypes = [
  "Sales performance (daily/weekly/monthly)",
  "Inventory valuation and slow movers",
  "Expiry exposure and waste risk",
  "Tax + VAT summary",
  "Supplier reliability and lead time",
  "Branch profitability comparison",
];

export default function ReportsPage() {
  return (
    <PharmacyShell
      title="Reporting & Exports"
      subtitle="Generate audit-ready PDF, CSV, and Excel outputs with schedule and branch filters."
    >
      <section className="rounded-3xl border border-[#dce8ff] bg-white p-6">
        <ul className="space-y-3">
          {reportTypes.map((type) => (
            <li key={type} className="rounded-2xl border border-[#e8efff] p-4 flex items-center justify-between">
              <span className="text-[#234274]">{type}</span>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#eef4ff] text-[#2c4f88] text-sm font-medium">
                <Download className="w-4 h-4" /> Export
              </button>
            </li>
          ))}
        </ul>
      </section>
    </PharmacyShell>
  );
}
