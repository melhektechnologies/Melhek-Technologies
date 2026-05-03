import type { ReactNode } from "react";
import { Bell, Search } from "lucide-react";
import { PharmacyNav } from "@/components/pharmacy/PharmacyNav";

export function PharmacyShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f6f9ff] text-[#10284f]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <header className="mb-8 rounded-3xl border border-[#d9e6ff] bg-white px-5 py-5 shadow-[0_12px_40px_rgba(52,90,170,0.08)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#6f8fcb] font-bold">Healthcare SaaS Command Center</p>
              <h1 className="text-3xl font-semibold text-[#0d2756] mt-2">{title}</h1>
              <p className="text-[#5f79a8] mt-2">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[#d9e6ff] px-3 py-2 bg-[#fbfdff] min-w-[260px]">
                <Search className="w-4 h-4 text-[#7a97c8]" />
                <input
                  readOnly
                  value="Search patients, invoices, medicines..."
                  className="w-full text-sm bg-transparent text-[#5c76a6] outline-none"
                />
              </div>
              <button className="relative w-10 h-10 rounded-2xl border border-[#d9e6ff] bg-white grid place-items-center">
                <Bell className="w-4 h-4 text-[#4a6ca7]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" aria-hidden />
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[290px_1fr] gap-6">
          <PharmacyNav />
          <section className="space-y-6">{children}</section>
        </div>
      </div>
    </main>
  );
}
