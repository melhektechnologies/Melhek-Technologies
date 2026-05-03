export type DivisionIconId =
  | "monitor"
  | "hotel"
  | "shield"
  | "construction"
  | "brain";

export interface Division {
  slug: string;
  id: string;
  title: string;
  sub: string;
  description: string;
  tags: string[];
  delay: number;
  span?: boolean;
  iconId: DivisionIconId;
  highlights: string[];
  detailIntro: string;
  capabilities: { title: string; desc: string }[];
}

export const DIVISIONS: Division[] = [
  {
    slug: "digital",
    id: "01 / DIVISION",
    title: "Melhek Digital",
    sub: "Web · Apps · Platforms",
    description:
      "Premium websites, enterprise web applications, dashboards, SaaS systems, and AI-powered digital platforms crafted with precision engineering and exceptional design craft.",
    iconId: "monitor",
    tags: ["Enterprise Web", "SaaS Platforms", "AI Systems"],
    delay: 0,
    highlights: [
      "Design systems & product UI at enterprise scale",
      "Next.js, React, and API-first architectures",
      "AI-assisted workflows embedded in your stack",
    ],
    detailIntro:
      "Melhek Digital is the flagship delivery arm for web, mobile, and platform engineering. We partner with leadership teams to ship resilient products—from marketing sites to mission-critical internal tools.",
    capabilities: [
      {
        title: "Product & platform engineering",
        desc: "Full-stack squads, CI/CD, observability, and performance budgets baked in from day one.",
      },
      {
        title: "Design & frontend excellence",
        desc: "Accessible, motion-aware interfaces that stay fast on real devices and networks.",
      },
      {
        title: "AI & automation layers",
        desc: "Practical LLM features, retrieval pipelines, and workflow automation—not slide-deck demos.",
      },
    ],
  },
  {
    slug: "hospitality",
    id: "02 / DIVISION",
    title: "Melhek Hospitality",
    sub: "Hotels · Restaurants · Booking",
    description:
      "Smart hospitality infrastructure transforming hotels, restaurants, and service businesses with intelligent management systems, digital concierge, and seamless booking technology.",
    iconId: "hotel",
    tags: ["Hotel Management", "Restaurant Tech", "Smart Booking"],
    delay: 0.1,
    highlights: [
      "Unified guest journeys across web and on-property",
      "Operations dashboards for revenue and staff",
      "Integrations with POS, PMS, and channel managers",
    ],
    detailIntro:
      "Hospitality runs on time, trust, and flawless coordination. Melhek Hospitality builds the digital layer that keeps guests delighted and teams in sync.",
    capabilities: [
      {
        title: "Booking & guest portals",
        desc: "High-conversion booking flows, loyalty touchpoints, and multilingual experiences.",
      },
      {
        title: "Restaurant & F&B tech",
        desc: "Digital menus, kitchen display alignment, and real-time service analytics.",
      },
      {
        title: "Operator tooling",
        desc: "Role-based consoles for managers, front desk, and executive reporting.",
      },
    ],
  },
  {
    slug: "secure",
    id: "03 / DIVISION",
    title: "Melhek Secure",
    sub: "Cybersecurity · Cloud · Protection",
    description:
      "Enterprise-grade cybersecurity division providing digital protection, cloud security architecture, real-time monitoring systems, and secure infrastructure for critical operations.",
    iconId: "shield",
    tags: ["Cloud Security", "Monitoring", "Coming 2029"],
    delay: 0.2,
    highlights: [
      "Zero-trust aligned patterns for cloud workloads",
      "Detection-oriented logging and alerting",
      "Hardening reviews for regulated industries",
    ],
    detailIntro:
      "Melhek Secure formalizes how we protect client systems—architecture reviews, secure SDLC practices, and continuous monitoring strategies.",
    capabilities: [
      {
        title: "Cloud & identity hardening",
        desc: "Least-privilege IAM, secrets management, and segmentation strategies.",
      },
      {
        title: "Detection engineering",
        desc: "Signal-rich telemetry, alert routing, and runbooks your team can execute.",
      },
      {
        title: "Compliance-ready documentation",
        desc: "Evidence packs and control mapping to support audits and security questionnaires.",
      },
    ],
  },
  {
    slug: "infrastructure",
    id: "04 / DIVISION",
    title: "Melhek Infrastructure",
    sub: "Networking · Buildings · Automation",
    description:
      "Physical-digital convergence through enterprise networking, smart office systems, building technology, intelligent WiFi infrastructure, and advanced automation solutions.",
    iconId: "construction",
    tags: ["Enterprise Network", "Smart Office", "Coming 2028"],
    delay: 0.3,
    highlights: [
      "Campus and branch network design",
      "Smart building sensors and automation glue",
      "WiFi planning for density and reliability",
    ],
    detailIntro:
      "When the physical and digital stack must work as one, Melhek Infrastructure delivers the integration layer—networks, automation, and observability for built environments.",
    capabilities: [
      {
        title: "Enterprise networking",
        desc: "Resilient LAN/WLAN designs, QoS, and guest access that does not compromise security.",
      },
      {
        title: "Building systems integration",
        desc: "APIs and middleware between BMS, access control, and business applications.",
      },
      {
        title: "Operational automation",
        desc: "Runbooks-as-code, scheduled maintenance windows, and health dashboards.",
      },
    ],
  },
  {
    slug: "ai-labs",
    id: "05 / DIVISION",
    title: "Melhek AI Labs",
    sub: "Automation · Analytics · Intelligence",
    description:
      "The intelligence engine of the Melhek ecosystem. We build AI automation pipelines, intelligent analytics systems, and smart business tools that transform how organizations operate in the age of artificial intelligence.",
    iconId: "brain",
    tags: ["AI Automation", "Analytics", "Workflow AI", "Business Intelligence"],
    delay: 0.4,
    span: true,
    highlights: [
      "Production RAG and tool-calling patterns",
      "Analytics models tied to business KPIs",
      "Workflow automation across SaaS tools",
    ],
    detailIntro:
      "AI Labs turns research into dependable systems: retrieval, evaluation, monitoring, and human-in-the-loop workflows that survive real traffic.",
    capabilities: [
      {
        title: "Applied ML & analytics",
        desc: "Forecasting, segmentation, and anomaly detection with clear ownership of data quality.",
      },
      {
        title: "Agentic & assistant experiences",
        desc: "Guardrailed assistants with audit trails and enterprise auth boundaries.",
      },
      {
        title: "MLOps-lite",
        desc: "Versioned prompts, datasets, and deployment patterns you can operate without a huge ML org.",
      },
    ],
  },
];

export function getDivisionBySlug(slug: string): Division | undefined {
  return DIVISIONS.find((d) => d.slug === slug);
}

export function getAllDivisionSlugs(): string[] {
  return DIVISIONS.map((d) => d.slug);
}
