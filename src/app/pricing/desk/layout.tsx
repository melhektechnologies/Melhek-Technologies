import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Desk | Melhek Technologies",
  description: "Internal pricing engine — founder access only.",
  robots: { index: false, follow: false },
};

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-melhek-dark min-h-screen overflow-x-hidden">
      {/* Subtle ambient background gradient */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-melhek-blue/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-melhek-steel/[0.03] rounded-full blur-[120px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(127,169,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(127,169,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>
      <div className="relative pt-6 pb-16">
        {children}
      </div>
    </div>
  );
}
