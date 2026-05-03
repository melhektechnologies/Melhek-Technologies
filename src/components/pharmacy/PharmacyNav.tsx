"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ChartNoAxesCombined, ClipboardList, FileText, Pill, ReceiptText, Settings, Sparkles, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/pharmacy", label: "Executive Dashboard", icon: ChartNoAxesCombined },
  { href: "/pharmacy/inventory", label: "Inventory & Batches", icon: Pill },
  { href: "/pharmacy/prescriptions", label: "Prescriptions", icon: ClipboardList },
  { href: "/pharmacy/pos", label: "POS Terminal", icon: ReceiptText },
  { href: "/pharmacy/suppliers", label: "Suppliers", icon: Store },
  { href: "/pharmacy/branches", label: "Branches", icon: Building2 },
  { href: "/pharmacy/reports", label: "Reports", icon: FileText },
  { href: "/pharmacy/ai", label: "AI Intelligence", icon: Sparkles },
  { href: "/pharmacy/settings", label: "System Settings", icon: Settings },
];

export function PharmacyNav() {
  const pathname = usePathname();

  return (
    <aside className="glass rounded-3xl p-4 border border-[#d9e6ff] bg-white/80 backdrop-blur sticky top-24 h-fit">
      <div className="px-3 py-4 mb-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#6f8fcb] font-bold">Melhek PMS</p>
        <h2 className="text-[#0c244f] text-lg font-semibold mt-2">Operations Console</h2>
      </div>
      <nav className="space-y-1.5" aria-label="Pharmacy modules">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-all",
                active
                  ? "bg-gradient-to-r from-[#0d6efd] to-[#12b6d9] text-white shadow-lg"
                  : "text-[#335389] hover:bg-[#edf4ff] hover:text-[#0f2a57]"
              )}
            >
              <Icon className={cn("w-4 h-4", active ? "text-white" : "text-[#4f6da5] group-hover:text-[#13468f]")} />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
