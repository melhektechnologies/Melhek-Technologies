import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function NotFound() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark min-h-[70vh] flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center">
        <p className="font-mono text-melhek-blue text-xs font-bold tracking-[0.3em] uppercase mb-6">404</p>
        <h1 className="text-4xl md:text-5xl font-syne font-extrabold text-white mb-4">Page not found</h1>
        <p className="text-white/50 max-w-md mb-10">
          That route is not part of the Melhek site map. Use the links below to get back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary text-sm">
            Home
          </Link>
          <Link href="/portfolio" className="btn-secondary text-sm">
            Portfolio
          </Link>
          <Link href="/contact" className="btn-secondary text-sm">
            Contact
          </Link>
        </div>
      </main>
    </MarketingLayout>
  );
}
