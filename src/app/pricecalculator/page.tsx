import type { Metadata } from "next";
import AuthGate from "@/app/pricing/components/AuthGate";
import FounderPricingDashboard from "@/app/pricing/components/FounderPricingDashboard";
import { hasPricingAccess, isPricingAuthConfigured } from "@/lib/pricing/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Internal Quote Engine | Melhek Technologies",
  description: "Private internal quotation workspace for Melhek Technologies.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noarchive: true },
  },
};

export default async function PriceCalculatorPage() {
  const authorized = await hasPricingAccess();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-melhek-dark">
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-melhek-blue/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[500px] rounded-full bg-melhek-steel/[0.03] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(127,169,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127,169,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
      <div className="relative pb-16 pt-6">
        {authorized ? (
          <FounderPricingDashboard />
        ) : (
          <AuthGate configured={isPricingAuthConfigured()} />
        )}
      </div>
    </main>
  );
}
