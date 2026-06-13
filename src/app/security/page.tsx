import type { Metadata } from "next";
import { MarketingLayout } from "@/components/MarketingLayout";

export const metadata: Metadata = {
  title: "Security Protocol | Melhek Technologies",
  description: "Learn about Melhek Technologies' strict engineering security protocols, data safety systems, and disclosure guidelines.",
};

export default function SecurityPage() {
  return (
    <MarketingLayout>
      <main className="relative bg-melhek-dark overflow-x-hidden pt-36 pb-24 text-left">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(127,169,255,0.03)_0%,_transparent_70%)] pointer-events-none -z-10" />

        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-syne font-extrabold text-white mb-8 tracking-tight">Security Protocol</h1>
          <p className="text-white/30 text-xs font-mono mb-8 uppercase tracking-widest">Last updated: June 12, 2026</p>

          <p className="text-white/70 leading-relaxed mb-6 font-light">
            At Melhek Technologies, security is not an afterthought—it is the foundation of our engineering architecture. We design and deliver custom operational software, corporate websites, and management platforms with strict data protection guidelines.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">1. Safe Software Development Lifecycle (SDLC)</h2>
          <p className="text-white/60 leading-relaxed mb-4 font-light">
            Every line of code we write undergoes strict quality checks before moving to production:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-6 font-light">
            <li><strong>Automated Code Auditing:</strong> We use dependency-vulnerability scanners to detect and update outdated libraries.</li>
            <li><strong>Principle of Least Privilege:</strong> Access to project code repositories and databases is restricted to the specific engineers assigned to the system.</li>
            <li><strong>Environment Isolation:</strong> Development, testing, and production servers are kept entirely separate to prevent data pollution or leaks.</li>
          </ul>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">2. Infrastructure & Data Protection</h2>
          <p className="text-white/60 leading-relaxed mb-4 font-light">
            We employ modern security standards to safeguard client databases and digital pipelines:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white/60 mb-6 font-light">
            <li><strong>SSL/TLS Encryption:</strong> All data transmitted to and from client websites and databases is encrypted in transit using high-grade SSL protocol.</li>
            <li><strong>Credential Hashing:</strong> Sensitive operational passwords, user credentials, and database keys are securely hashed using modern cryptographic algorithms.</li>
            <li><strong>Secure Key Vaulting:</strong> API keys, payment gateway secrets, and cloud environment credentials are stored in isolated configuration vaults, never committed directly to raw git codebases.</li>
          </ul>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">3. Independent Client Data Safeguards</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            Because we operate independently without centralized physical office boundaries, our data access model is fully virtualized and secured. All engineering work is conducted via encrypted networks, and local machines running project workspaces are protected by multi-factor authentication and full-disk encryption. We enforce a zero-local-storage policy for sensitive production databases.
          </p>

          <h2 className="text-xl font-syne font-bold text-white mt-12 mb-4 uppercase tracking-wider">4. Reporting Vulnerabilities</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            If you are a security researcher, client, or user and have identified a potential vulnerability in a system engineered by Melhek Technologies, we appreciate your support in reporting it responsibly. Please do not exploit the vulnerability or execute testing that could impact system availability.
          </p>
          <p className="text-white/60 leading-relaxed mb-8 font-light">
            Send reports directly to our secure inbox at:{" "}
            <a href="mailto:melhektechnologies@gmail.com" className="text-melhek-blue hover:underline font-mono">
              melhektechnologies@gmail.com
            </a>
          </p>

          <p className="text-white/60 leading-relaxed mb-8 font-light">
            Melhek Technologies<br />
            Addis Ababa, Ethiopia
          </p>
        </article>
      </main>
    </MarketingLayout>
  );
}
