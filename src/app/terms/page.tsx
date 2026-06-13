import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Melhek Technologies",
  description: "Terms governing use of Melhek Technologies websites, client dashboards, and custom software development services.",
};

export default function TermsPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24 text-left">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(127,169,255,0.03)_0%,_transparent_70%)] pointer-events-none -z-10" />

        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-syne font-extrabold text-white mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-white/30 text-xs font-mono mb-8 uppercase tracking-widest">Last updated: June 12, 2026</p>

          <p className="text-white/70 leading-relaxed mb-6 font-light">
            Welcome to Melhek Technologies. By accessing our website, client intake dashboards, automated operational tools, or by engaging our custom software engineering, website development, or technology consultancy services, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">1. Engagement & Statements of Work</h2>
          <p className="text-white/60 leading-relaxed mb-4 font-light">
            These general terms apply to all digital services and website visits. Specific custom engineering engagements, system setups, and operational support details are governed by dedicated signed Statements of Work (SOWs) or Service Level Agreements (SLAs).
          </p>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            Any modification to project scopes, delivery schedules, or pricing structures must be formalized in writing and approved by authorized representatives from both Melhek Technologies and the client.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">2. Intellectual Property Rights</h2>
          <p className="text-white/60 leading-relaxed mb-4 font-light">
            We value clean ownership and clear asset boundaries:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-6 font-light">
            <li><strong>Client Materials:</strong> The client retains all ownership and intellectual property rights over files, content assets, logos, and custom copy provided to Melhek Technologies to build their systems.</li>
            <li><strong>Developed Software:</strong> Upon complete settlement of all agreed milestone payments, ownership of the custom codebase, graphics layout, and website assets shifts to the client, subject to the licensing of any pre-existing Melhek core modules or third-party libraries incorporated.</li>
            <li><strong>Melhek Core Technologies:</strong> Melhek Technologies retains ownership over its core tools, boilerplate layouts, code repositories, and proprietary modules designed to accelerate system assembly.</li>
          </ul>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">3. Client Responsibilities</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            To ensure zero bottlenecks and successful project delivery, clients must cooperate in good faith. This includes providing timely system specifications, access credentials, asset materials, and participating in scheduled sprint review sessions. Melhek Technologies is not liable for project delays resulting from client bottlenecks or failure to provide required credentials.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">4. Payment Terms & Milestone Billings</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            Payments are structured based on predefined project milestones (typically starting with a design setup deposit, development check, and final deployment settlement). Invoices are billed electronically. In the event of a payment default, Melhek Technologies reserves the right to suspend development cycles, restrict server access, or pause active deployments until balances are fully resolved.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">5. Warranties & Limitation of Liability</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            Melhek Technologies provides its websites and consulting services on an &quot;as is&quot; and &quot;as available&quot; basis, except as explicitly warranted in individual project contracts. To the maximum extent permitted by applicable law, Melhek Technologies is not liable for indirect, incidental, or consequential damages (including database downtime, server disruptions, or operational stock discrepancies) arising from use of our custom software.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">6. Governing Law</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            These Terms of Service and any dispute arising out of your relationship with Melhek Technologies are governed by and construed in accordance with the laws of Ethiopia, with exclusive jurisdiction resolved by tribunals in Addis Ababa.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">7. Contact Compliance Desk</h2>
          <p className="text-white/60 leading-relaxed mb-8 font-light">
            For questions regarding legal compliance, service terms, SOW setups, or milestone bills, please speak with our compliance coordinators:
          </p>
          <p className="text-white/60 leading-relaxed mb-8 font-light">
            Melhek Technologies<br />
            Addis Ababa, Ethiopia<br />
            Email:{" "}
            <a href="mailto:melhektechnologies@gmail.com" className="text-melhek-blue hover:underline font-mono">
              melhektechnologies@gmail.com
            </a>
          </p>
        </article>
      </main>
    </MarketingLayout>
  );
}
