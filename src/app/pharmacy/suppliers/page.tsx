import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";
import { supplierData } from "@/lib/pharmacy/demo-data";

export default function SuppliersPage() {
  return (
    <PharmacyShell
      title="Supplier Management"
      subtitle="Onboarding, performance scoring, invoice commitments, and intelligent procurement readiness."
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {supplierData.map((s) => (
          <article key={s.id} className="rounded-3xl border border-[#dce8ff] bg-white p-5">
            <h3 className="text-lg font-semibold text-[#133161]">{s.name}</h3>
            <p className="text-sm text-[#5d7aab] mt-1">{s.contact}</p>
            <div className="mt-4 text-sm text-[#4f6fa6] space-y-1">
              <p>Rating: {s.rating}/5</p>
              <p>On-time delivery: {s.onTimeDelivery}%</p>
              <p>Outstanding: ETB {s.outstandingBalance.toLocaleString()}</p>
            </div>
          </article>
        ))}
      </div>
    </PharmacyShell>
  );
}
