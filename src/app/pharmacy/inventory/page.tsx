import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";
import { medicineData } from "@/lib/pharmacy/demo-data";

export default function InventoryPage() {
  return (
    <PharmacyShell
      title="Medicine Inventory, Batches & Expiry"
      subtitle="Track stock, batch movement, barcode references, and proactive expiry controls."
    >
      <div className="rounded-3xl border border-[#dce8ff] bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f3f7ff] text-[#4c6da5] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Medicine</th>
              <th className="px-4 py-3 text-left">SKU/Batch</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Expiry</th>
              <th className="px-4 py-3 text-left">Supplier</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {medicineData.map((m) => (
              <tr key={m.id} className="border-t border-[#edf2ff]">
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#123061]">{m.name}</p>
                  <p className="text-xs text-[#6b88ba]">{m.genericName} • {m.dosage}</p>
                </td>
                <td className="px-4 py-3 text-[#42639d]">{m.sku} / {m.batchNo}</td>
                <td className="px-4 py-3 text-[#123061]">{m.inStock} (reorder {m.reorderLevel})</td>
                <td className="px-4 py-3 text-[#42639d]">{m.expiryDate}</td>
                <td className="px-4 py-3 text-[#42639d]">{m.supplier}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#edf4ff] text-[#315288]">{m.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PharmacyShell>
  );
}
