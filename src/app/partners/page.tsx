import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Scale Your Agency: B2B Partner Center | Melhek Technologies",
  description: "Scale your agency without expanding your technical team. Partner with Melhek Technologies for white-label web development, custom operational systems, booking engines, and AI automation.",
  keywords: [
    "white label software development Ethiopia",
    "agency development partner Addis Ababa",
    "outsource web development",
    "B2B software partner",
    "white label systems integration",
  ],
};

export default function PartnersPage() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <main className="relative bg-melhek-dark overflow-x-hidden pt-32 pb-16">
        <PartnersClient />
      </main>
    </>
  );
}
