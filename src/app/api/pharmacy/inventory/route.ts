import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { medicineData } from "@/lib/pharmacy/demo-data";

const querySchema = z.object({
  status: z.enum(["ok", "low", "expiring", "expired"]).optional(),
  q: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({
    status: request.nextUrl.searchParams.get("status") ?? undefined,
    q: request.nextUrl.searchParams.get("q") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const { status, q } = parsed.data;
  const result = medicineData.filter((m) => {
    const statusOk = status ? m.status === status : true;
    const query = q?.toLowerCase();
    const searchOk = query
      ? [m.name, m.genericName, m.sku, m.batchNo, m.supplier].join(" ").toLowerCase().includes(query)
      : true;
    return statusOk && searchOk;
  });

  return NextResponse.json({ data: result, total: result.length });
}
