import type { Project } from "@/types/project";

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    name: "Luxury Hotel Management System",
    category: "Hospitality Technology",
    sector: "Hospitality Technology",
    description: "Enterprise property management system and unified booking engine engineered for high-end luxury resorts in East Africa.",
    gradient: "from-blue-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "Hotel",
    slug: "luxury-hotel-management",
    tags: ["Next.js", "PMS Sync", "Edge Caching", "Fintech"],
    businessOutcome: "Drove a 42% increase in direct bookings, eliminating intermediary commission fees and unifying guest profiles.",
    techCapability: "Built with a custom Next.js edge-cached framework and localized transaction pipelines.",
    scalability: "Engineered to support 50,000 concurrent searches with sub-50ms API response latency."
  },
  {
    id: "2",
    name: "Smart Restaurant Platform",
    category: "Hospitality Technology",
    sector: "Hospitality Technology",
    description: "Real-time kitchen display, automated inventory tracking, and POS integrations for premium hospitality chains.",
    gradient: "from-orange-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "Utensils",
    slug: "smart-restaurant-platform",
    tags: ["WebSockets", "POS Integration", "Local-First"],
    businessOutcome: "Reduced ingredient waste by 18% and accelerated table turnaround time by 12 minutes on average.",
    techCapability: "Features a WebSocket-driven active order queue, local-first database synchronization, and offline-resilient operations.",
    scalability: "Supports up to 100 active dining terminals per venue with zero-latency kitchen dashboard updates."
  },
  {
    id: "3",
    name: "Pharmacy Management Platform",
    category: "Healthcare Technology",
    sector: "Healthcare Technology",
    description: "Robust operational database for multi-branch retail pharmacies, automating batch control and expiration tracking.",
    gradient: "from-emerald-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "Pill",
    slug: "pharmacy-management",
    image: "/portfolio/pharmacy-management.png",
    tags: ["Inventory Control", "Database Sync", "Compliance"],
    businessOutcome: "Automated alert pipelines for expiring batches, reducing pharmaceutical waste by 28% across 12 branches.",
    techCapability: "Advanced inventory reconciliation algorithms, encrypted patient record schemas, and automated restock orders.",
    scalability: "Capable of handling concurrent inventory updates from 50+ branches with transaction integrity locks."
  },
  {
    id: "4",
    name: "Healthcare Booking Platform",
    category: "Healthcare Technology",
    sector: "Healthcare Technology",
    description: "Unified clinical calendar, secure patient intake records, and automated consultation scheduling.",
    gradient: "from-purple-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "Activity",
    slug: "healthcare-booking",
    image: "/portfolio/happy-optics.png",
    tags: ["SaaS", "Scheduler", "Security Protocols"],
    businessOutcome: "Cut patient check-in wait times by 60% and automated SMS consultation reminders to reduce no-shows.",
    techCapability: "Implements end-to-end encrypted databases and a calendar scheduling engine with collision resolution.",
    scalability: "Built to process over 5,000 bookings daily across multiple departments without performance degradation."
  },
  {
    id: "5",
    name: "Retail Management System",
    category: "Retail Technology",
    sector: "Retail Technology",
    description: "Unified commerce engine connecting physical brick-and-mortar storefronts with digital inventory channels.",
    gradient: "from-pink-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "ShoppingBag",
    slug: "retail-management-system",
    tags: ["Omnichannel", "Stock Sync", "Automated ETL"],
    businessOutcome: "Unified retail operations across 5 outlets and synchronized stock levels in real time, preventing double sales.",
    techCapability: "Utilizes edge-based inventory state machines and a custom POS integration API.",
    scalability: "Effortlessly handles catalog sizes exceeding 10,000 items with instant stock updates across all locations."
  },
  {
    id: "6",
    name: "Car Sales Digital Showroom",
    category: "Automotive Technology",
    sector: "Automotive Technology",
    description: "High-end vehicle showroom presenting imports, interactive specifications, and secure custom order funnels.",
    gradient: "from-blue-950/50 via-melhek-navy/80 to-melhek-dark",
    iconName: "Car",
    slug: "car-sales-showroom",
    image: "/portfolio/amen-car-import.png",
    tags: ["Heavy Asset Tuning", "Luxury UX", "Sales Pipelines"],
    businessOutcome: "Boosted digital leads by 300% and automated shipping/import tracking notifications for high-ticket buyers.",
    techCapability: "Highly optimized media loading, responsive 3D interactive assets, and automated CRM routing.",
    scalability: "Distributed via CDN edge servers to ensure load times under 1 second, even on low-bandwidth cellular networks."
  },
  {
    id: "7",
    name: "Religious Organization Website",
    category: "Faith & Community Platforms",
    sector: "Faith & Community Platforms",
    description: "High-traffic community anchor providing media broadcasts, digital tithes, and member administration.",
    gradient: "from-slate-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "Users",
    slug: "religious-organization",
    tags: ["Streaming", "Community Hub", "Secure Payments"],
    businessOutcome: "Connected 10,000+ global diaspora members, hosting live streams and secure online contributions.",
    techCapability: "Serverless live streaming integration, multi-currency payment gateway integration, and member database.",
    scalability: "Deploys to serverless infrastructure capable of scaling to 20,000 concurrent viewers during broadcast peaks."
  },
  {
    id: "8",
    name: "AI Dashboard",
    category: "Business Intelligence",
    sector: "Business Intelligence",
    description: "Operational intelligence console executing real-time data analytics, anomaly detection, and KPI metrics.",
    gradient: "from-cyan-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "Brain",
    slug: "ai-dashboard",
    tags: ["AI Labs", "Analytics", "Data Visualization"],
    businessOutcome: "Identified warehouse routing bottlenecks, yielding a 15% reduction in yearly operating overhead.",
    techCapability: "In-browser analytics parsing, serverless AI model inference pipelines, and highly reactive SVG charts.",
    scalability: "Optimized data processing engines to parse and visualize 100,000 telemetry packets per second."
  },
  {
    id: "9",
    name: "Analytics Systems",
    category: "Business Intelligence",
    sector: "Business Intelligence",
    description: "Enterprise data integration layer mapping telemetry, supply chain flows, and financial indicators.",
    gradient: "from-teal-900/40 via-melhek-navy/80 to-melhek-dark",
    iconName: "TrendingUp",
    slug: "analytics-systems",
    tags: ["Data Engineering", "ETL", "System Architecture"],
    businessOutcome: "Aggregated legacy accounting and logistics logs to establish a singular dashboard for executive planning.",
    techCapability: "Automated serverless ETL pipelines, secure data warehouse integrations, and high-performance querying APIs.",
    scalability: "Allows complex SQL querying on historical data warehouses containing millions of logs in under 2 seconds."
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS_DATA.map((p) => p.slug);
}
