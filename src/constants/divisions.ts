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
    slug: "website-development",
    id: "01 / SERVICE",
    title: "Website Development",
    sub: "Premium · Scalable · Modern",
    description:
      "Crafting high-performance websites and enterprise web platforms that serve as the digital cornerstone for Ethiopian businesses scaling to the global market.",
    iconId: "monitor",
    tags: ["Enterprise Web", "SaaS Platforms", "UI/UX Design"],
    delay: 0,
    highlights: [
      "Custom-engineered Next.js architectures",
      "High-conversion performance optimization",
      "Localized and global-ready digital experiences",
    ],
    detailIntro:
      "At Melhek, we don't just build sites; we engineer digital destinations. Our web division focuses on performance, accessibility, and architectural integrity.",
    capabilities: [
      {
        title: "Platform Engineering",
        desc: "Building the backbone of your business with modern, secure, and fast web technologies.",
      },
      {
        title: "Custom UI/UX Craft",
        desc: "World-class design language tailored to your brand identity and user journey.",
      },
    ],
  },
  {
    slug: "ai-systems",
    id: "02 / SERVICE",
    title: "AI Systems",
    sub: "Intelligent · Automated · Adaptive",
    description:
      "Integrating advanced Artificial Intelligence into business workflows to automate decision-making, optimize resource allocation, and drive intelligent growth.",
    iconId: "brain",
    tags: ["NLP & RAG", "Computer Vision", "Predictive Analytics"],
    delay: 0.1,
    highlights: [
      "Custom LLM implementations and RAG pipelines",
      "Process optimization through machine learning",
      "Intelligent data visualization & insights",
    ],
    detailIntro:
      "Intelligence is the new utility. We build AI systems that move beyond the hype, delivering measurable ROI and operational efficiency.",
    capabilities: [
      {
        title: "Agentic Workflows",
        desc: "Autonomous AI agents that handle repetitive tasks and complex logic with precision.",
      },
      {
        title: "Intelligent Search",
        desc: "Advanced Retrieval-Augmented Generation (RAG) for enterprise knowledge bases.",
      },
    ],
  },
  {
    slug: "business-automation",
    id: "03 / SERVICE",
    title: "Business Automation",
    sub: "Efficiency · Accuracy · Speed",
    description:
      "Streamlining complex organizational processes with customized automation tools that reduce human error and maximize operational throughput.",
    iconId: "construction",
    tags: ["Workflow Automation", "ERP Integration", "Smart Systems"],
    delay: 0.2,
    highlights: [
      "End-to-end operational visibility",
      "Legacy system modernization & integration",
      "Automated reporting and administrative workflows",
    ],
    detailIntro:
      "Scale shouldn't equal complexity. We automate the friction away, allowing your team to focus on high-value creative and strategic work.",
    capabilities: [
      {
        title: "Process Orchestration",
        desc: "Automating cross-departmental tasks for seamless business operations.",
      },
      {
        title: "Real-time Dashboards",
        desc: "Command centers that give you a bird's-eye view of your entire business health.",
      },
    ],
  },
  {
    slug: "hotel-technology",
    id: "04 / SERVICE",
    title: "Hotel Technology",
    sub: "Hospitality · Guest Exp · Management",
    description:
      "Modernizing Ethiopia's hospitality sector with intelligent PMS systems, smart booking portals, and integrated guest experience management platforms.",
    iconId: "hotel",
    tags: ["Smart Booking", "PMS Integration", "Guest Analytics"],
    delay: 0.3,
    highlights: [
      "Unified hotel management systems",
      "Seamless guest check-in & concierge tech",
      "Revenue management and occupancy optimization",
    ],
    detailIntro:
      "Hospitality is about connection. We build the technology that fades into the background, letting you focus on providing exceptional service.",
    capabilities: [
      {
        title: "Smart Reservations",
        desc: "Direct booking engines that reduce reliance on costly third-party aggregators.",
      },
      {
        title: "Operational Dashboards",
        desc: "Manage everything from housekeeping to F&B inventory in one central system.",
      },
    ],
  },
  {
    slug: "digital-transformation",
    id: "05 / SERVICE",
    title: "Digital Transformation",
    sub: "Strategy · Modernization · Future",
    description:
      "Guiding legacy enterprises through the complexities of modernization, ensuring technical infrastructure is robust, secure, and ready for future scale.",
    iconId: "shield",
    tags: ["Tech Audit", "Cloud Migration", "Strategy"],
    delay: 0.4,
    span: true,
    highlights: [
      "Comprehensive digital roadmap planning",
      "Secure cloud architecture & migration",
      "Cultural shift through technology adoption",
    ],
    detailIntro:
      "Transformation is not just about tools; it's about shifting how a business thinks. We provide the roadmap and the engine to get you there.",
    capabilities: [
      {
        title: "Strategic Consulting",
        desc: "Technical leadership to align your business goals with the right technology stack.",
      },
      {
        title: "Cybersecurity & Resilience",
        desc: "Building fortress-like protection into every layer of your digital presence.",
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
