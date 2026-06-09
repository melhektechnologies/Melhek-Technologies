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
    slug: "melhek-digital",
    id: "01 / DIVISION",
    title: "Melhek Digital",
    sub: "Enterprise Platforms · Web Applications · SaaS",
    description:
      "Engineering high-performance web systems, custom SaaS architectures, and premium digital interfaces that form the operational backbone of scaling enterprises.",
    iconId: "monitor",
    tags: ["Enterprise Web", "SaaS Architecture", "Platform Engineering"],
    delay: 0,
    highlights: [
      "Custom Next.js edge-rendered architectures",
      "High-conversion, sub-second load environments",
      "Robust state management and API design",
    ],
    detailIntro:
      "Melhek Digital delivers custom frontend and backend systems built to withstand enterprise-grade operational scale. We design robust digital interfaces that drive direct value and guarantee structural reliability.",
    capabilities: [
      {
        title: "Platform Engineering",
        desc: "Building low-latency, scalable architectures utilizing modern React frameworks, edge databases, and secure APIs.",
      },
      {
        title: "Premium User Experience",
        desc: "Developing polished UI designs with custom micro-animations that establish credibility and engage enterprise-level clientele.",
      },
    ],
  },
  {
    slug: "melhek-hospitality",
    id: "02 / DIVISION",
    title: "Melhek Hospitality",
    sub: "Hotel Systems · Booking Ecosystems · PMS Integration",
    description:
      "Modernizing East Africa's hospitality sector with integrated property management systems, custom booking pipelines, and guest experience portals.",
    iconId: "hotel",
    tags: ["Booking Engines", "PMS Sync Pipelines", "Guest Portals"],
    delay: 0.1,
    highlights: [
      "Direct-booking engines to maximize profit margins",
      "Automated property management sync interfaces",
      "Omnichannel reservation analytics and metrics",
    ],
    detailIntro:
      "Melhek Hospitality engineers the technology that powers premium accommodation providers. We streamline complex guest and admin operations, replacing friction with high-availability tools.",
    capabilities: [
      {
        title: "Integrated Reservation Systems",
        desc: "Creating zero-commission booking pipelines that sync instantly with local Property Management Systems (PMS).",
      },
      {
        title: "Digital Concierge Apps",
        desc: "Developing guest portals for in-room service requests, activity reservations, and checkout administration.",
      },
    ],
  },
  {
    slug: "melhek-ai-labs",
    id: "03 / DIVISION",
    title: "Melhek AI Labs",
    sub: "Intelligent Workflows · Analytics · Automation",
    description:
      "Integrating production-grade machine learning pipelines and agentic automation workflows to optimize business processes and visual telemetry.",
    iconId: "brain",
    tags: ["Agentic Workflows", "Business Intelligence", "Machine Learning"],
    delay: 0.2,
    highlights: [
      "Autonomous agent systems executing complex workflows",
      "Retrieval-Augmented Generation (RAG) knowledge search",
      "Telemetry extraction and business intelligence modeling",
    ],
    detailIntro:
      "Melhek AI Labs focuses on bringing tangible machine intelligence to operations. We build pipelines that eliminate admin bottlenecks, synthesize complex data assets, and automate decision metrics.",
    capabilities: [
      {
        title: "Agentic Automation",
        desc: "Engineering autonomous software agents that process emails, handle compliance checks, and run operational loops.",
      },
      {
        title: "Information Synthesis & RAG",
        desc: "Building search interfaces that enable employees to query vast technical databases and retrieve precise answers.",
      },
    ],
  },
  {
    slug: "melhek-secure",
    id: "04 / DIVISION",
    title: "Melhek Secure",
    sub: "Cybersecurity · Identity Management · Threat Analysis",
    description:
      "Establishing unshakeable cybersecurity postures, secure credential workflows, data protection protocols, and operational compliance strategies.",
    iconId: "shield",
    tags: ["Data Hardening", "Identity Protocols", "Compliance Auditing"],
    delay: 0.3,
    highlights: [
      "Threat modeling for high-transaction environments",
      "Role-based access controls and tokenization security",
      "Data sovereignty and end-to-end encrypted tunnels",
    ],
    detailIntro:
      "Melhek Secure guarantees the integrity of your corporate assets. We audit, harden, and defend database infrastructure and user endpoints against emerging cyber threats.",
    capabilities: [
      {
        title: "Security Infrastructure Audit",
        desc: "Identifying vulnerability profiles in application logic, server ports, and cloud server configurations.",
      },
      {
        title: "Identity Protection Frameworks",
        desc: "Deploying multi-factor authentication, single sign-on (SSO), and zero-trust verification procedures.",
      },
    ],
  },
  {
    slug: "melhek-infrastructure",
    id: "05 / DIVISION",
    title: "Melhek Infrastructure",
    sub: "Networking · Smart Systems · Edge Computing",
    description:
      "Bridging virtual systems and physical infrastructure. Engineering edge computing environments, corporate local networks, and smart facility controllers.",
    iconId: "construction",
    tags: ["Local Area Networks", "Edge Computing Nodes", "Smart Automation"],
    delay: 0.4,
    span: true,
    highlights: [
      "Low-latency edge deployment distribution",
      "Structured networking layouts and cabling strategy",
      "Hardware-software communication system links",
    ],
    detailIntro:
      "Melhek Infrastructure designs the structural foundation of modern offices and facilities. We integrate physical local networks with modern cloud orchestration systems.",
    capabilities: [
      {
        title: "Edge Deployments",
        desc: "Deploying edge server environments close to physical operators to guarantee maximum speed and localized uptime.",
      },
      {
        title: "Smart Facility Controls",
        desc: "Engineering software-defined network (SDN) configurations and automated facility control systems.",
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
