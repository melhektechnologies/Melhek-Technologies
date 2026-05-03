import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";
import { prescriptionData } from "@/lib/pharmacy/demo-data";

export default function PrescriptionsPage() {
  return (
    <PharmacyShell
      title="Prescription Management"
      subtitle="Digital RX workflows with refill tracking, validation flags, and patient-safe dispensing context."
    >
      <div className="grid lg:grid-cols-2 gap-5">
        {prescriptionData.map((rx) => (
          <article key={rx.id} className="rounded-3xl border border-[#dce8ff] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6e8ec2]">{rx.rxNumber}</p>
            <h3 className="text-xl font-semibold text-[#143263] mt-2">{rx.patientName}</h3>
            <p className="text-sm text-[#5c79ac] mt-1">Prescribed by {rx.doctor}</p>
            <p className="text-sm text-[#5c79ac] mt-3">Medicines: {rx.medicines.join(", ")}</p>
            <div className="flex items-center justify-between mt-5">
              <span className="text-sm text-[#4d6ea7]">Refills left: {rx.refillRemaining}</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#eef4ff] text-[#355a96]">{rx.status}</span>
            </div>
          </article>
        ))}
      </div>
    </PharmacyShell>
  );
}
