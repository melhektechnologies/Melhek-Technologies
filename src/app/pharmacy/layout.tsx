import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Melhek Pharmacy Management System",
  description: "Enterprise-grade pharmacy operations platform by Melhek.",
};

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
