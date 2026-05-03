import { Sparkles } from "lucide-react";
import { PharmacyShell } from "@/components/pharmacy/PharmacyShell";
import { aiInsights } from "@/lib/pharmacy/demo-data";

const prompts = [
  "Show medicines expiring this month",
  "Which products generate highest profit?",
  "Predict next month demand for diabetes category",
  "Highlight suspicious discount activity",
];

export default function AiModulePage() {
  return (
    <PharmacyShell
      title="AI Intelligence Studio"
      subtitle="Forecasting, anomaly detection, restocking recommendations, and natural-language analytics commands."
    >
      <section className="rounded-3xl border border-[#dce8ff] bg-white p-6">
        <div className="rounded-2xl border border-[#dce8ff] bg-[#f8fbff] p-4 mb-5">
          <p className="text-sm text-[#3f5f94]">AI Assistant</p>
          <p className="font-medium text-[#123061] mt-1">How can I optimize this week’s stock and margin?</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {prompts.map((p) => (
            <button key={p} className="text-left rounded-2xl border border-[#e6eeff] p-3 text-sm text-[#416299] hover:bg-[#f2f7ff]">{p}</button>
          ))}
        </div>
        <div className="space-y-3">
          {aiInsights.map((insight) => (
            <div key={insight} className="rounded-2xl border border-[#e6eeff] p-4 text-sm text-[#3e5f95] flex gap-2">
              <Sparkles className="w-4 h-4 mt-0.5 text-cyan-600" />
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </section>
    </PharmacyShell>
  );
}
