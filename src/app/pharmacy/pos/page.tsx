import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";
import { salesData } from "@/lib/pharmacy/demo-data";

export default function PosPage() {
  return (
    <PharmacyShell
      title="POS Terminal"
      subtitle="High-speed checkout architecture with tax, discount, receipt, and payment orchestration readiness."
    >
      <section className="rounded-3xl border border-[#dce8ff] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#123061] mb-4">Current Shift Transactions</h2>
        <div className="space-y-3">
          {salesData.map((sale) => (
            <div key={sale.id} className="rounded-2xl border border-[#e8efff] p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#123061]">{sale.invoiceNo}</p>
                <p className="text-sm text-[#5b79ac]">{sale.customer} • {sale.cashier} • {sale.paymentMethod}</p>
              </div>
              <p className="text-[#123061] font-semibold">ETB {sale.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </PharmacyShell>
  );
}
