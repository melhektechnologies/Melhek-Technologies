import type { Metadata } from "next";
import Link from "next/link";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Melhek Technologies",
  description: "Learn how Melhek Technologies collects, protects, and handles your personal information and project data.",
};

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24 text-left">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(127,169,255,0.03)_0%,_transparent_70%)] pointer-events-none -z-10" />

        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-syne font-extrabold text-white mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-white/30 text-xs font-mono mb-8 uppercase tracking-widest">Last updated: June 12, 2026</p>
          
          <p className="text-white/70 leading-relaxed mb-6 font-light">
            At Melhek Technologies, we are committed to safeguarding your privacy. This Privacy Policy outlines our practices regarding the collection, use, protection, and disclosure of personal information and proprietary project data when you use our website, client portals, automated operations dashboards, or engage our engineering consultancy services.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">1. Information We Collect</h2>
          <p className="text-white/60 leading-relaxed mb-4 font-light">
            We collect information necessary to deliver high-quality technology solutions and maintain secure communication:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-6 font-light">
            <li><strong>Personal Credentials:</strong> Name, professional email, phone number, organization name, and billing details provided during client intake.</li>
            <li><strong>Project Scope Data:</strong> System specifications, database schemas, API keys, server credentials, and assets supplied to facilitate custom software engineering.</li>
            <li><strong>Technical Operations Logs:</strong> IP addresses, browser types, device parameters, system uptime records, and usage analytics gathered automatically to optimize performance and prevent security threats.</li>
          </ul>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">2. How We Process Your Data</h2>
          <p className="text-white/60 leading-relaxed mb-4 font-light">
            Your data is processed strictly in accordance with ethical engineering practices and local data regulations:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-6 font-light">
            <li>To provision, maintain, and secure custom business websites and hospitality management systems.</li>
            <li>To coordinate project sprints, report diagnostics telemetry, and resolve client support tickets.</li>
            <li>To safeguard our network infrastructure against vulnerabilities, malware, or unauthorized login attempts.</li>
            <li>To communicate crucial platform upgrades, system maintenance cycles, or account statements.</li>
          </ul>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">3. Information Protection & Retention</h2>
          <p className="text-white/60 leading-relaxed mb-4 font-light">
            We implement enterprise-grade security protocols to prevent data leaks, unauthorized access, or loss:
          </p>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            All codebases, database structures, and credentials are encrypted during transmission (SSL/TLS) and at rest on secure cloud servers. We restrict internal access to project environments solely to consulting engineers working directly on your system. We retain personal and project data only as long as necessary to fulfill contractual obligations and warrant system uptime.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">4. Third-Party Sharing</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            Melhek Technologies does not sell, lease, or distribute your personal details or codebase configurations to third-party advertisers. We share information only with trusted cloud infrastructure partners (e.g., hosting providers, database nodes) strictly as required to deploy and support your systems, or when legally compelled by regulatory authorities in Addis Ababa, Ethiopia.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">5. Your Privacy Rights</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            You maintain full authority over your data. You may request access to, correction of, or deletion of your personal information and archived project configurations at any time. To exercise these rights, please contact our data compliance desk.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">6. Policy Adjustments</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            We reserve the right to modify this policy as technologies, security practices, and legal frameworks evolve. We will notify active clients of any significant changes via email or direct portal updates.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">7. Contact Engineering Desk</h2>
          <p className="text-white/60 leading-relaxed mb-8 font-light">
            For inquiries regarding our data handling, security architecture, or compliance metrics, please get in touch:
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
