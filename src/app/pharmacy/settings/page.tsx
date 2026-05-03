import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";

const configs = [
  "Company branding and invoice template",
  "Tax/VAT policy by branch",
  "Currency, locale, language",
  "Notification channels (email/SMS/push)",
  "Access policies and MFA requirements",
  "Data retention and backup schedule",
];

export default function SettingsPage() {
  return (
    <PharmacyShell
      title="System Configuration"
      subtitle="Enterprise policy controls for identity, finance, branding, and operational compliance."
    >
      <section className="rounded-3xl border border-[#dce8ff] bg-white p-6">
        <div className="grid md:grid-cols-2 gap-3">
          {configs.map((cfg) => (
            <div key={cfg} className="rounded-2xl border border-[#e8efff] p-4 text-[#3d5f95]">{cfg}</div>
          ))}
        </div>
      </section>
    </PharmacyShell>
  );
}
