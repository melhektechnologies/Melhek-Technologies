import { NextResponse } from "next/server";
import { dashboardKpis, aiInsights, salesData, medicineData } from "@/lib/pharmacy/demo-data";

export async function GET() {
  return NextResponse.json({
    kpis: dashboardKpis,
    insights: aiInsights,
    latestTransactions: salesData.slice(0, 10),
    stockSignals: {
      low: medicineData.filter((m) => m.status === "low").length,
      expiring: medicineData.filter((m) => m.status === "expiring").length,
      expired: medicineData.filter((m) => m.status === "expired").length,
    },
  });
}
