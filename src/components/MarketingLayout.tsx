import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
