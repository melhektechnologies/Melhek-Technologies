export type DivisionIconId =
  | "monitor"
  | "hotel"
  | "shield"
  | "construction"
  | "brain"
  | "server";

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
  projectSlugs: string[];
}

export const DIVISIONS: Division[] = [
  {
    slug: "melhek-digital",
    id: "01 / DIVISION",
    title: "Melhek Digital",
    sub: "Professional Websites · Online Presence · Customer Portals",
    description:
      "Helping businesses build a strong digital presence, attract customers, and establish credibility online through modern, responsive corporate and professional websites.",
    iconId: "monitor",
    tags: ["Business Websites", "Company Portals", "Customer Experiences"],
    delay: 0,
    highlights: [
      "Attract customers with a modern, fast company website",
      "Display your professional credentials and services clearly",
      "Connect with clients using simple contact and appointment forms",
    ],
    detailIntro:
      "Melhek Digital helps companies build credibility and reach new customers online. We design and build professional websites that load instantly, display beautifully on mobile phones, and make it easy for clients to connect with your business.",
    capabilities: [
      {
        title: "Company & Business Websites",
        desc: "High-quality homepages tailored to represent your brand, highlight your services, and attract new customers.",
      },
      {
        title: "Client Intake & Inquiries",
        desc: "Simple, secure forms that allow your visitors to request consultations, book appointments, or ask questions online.",
      },
    ],
    projectSlugs: ["healthcare-booking", "belete-tasew-law", "corporate-business-website", "religious-organization"]
  },
  {
    slug: "melhek-hospitality",
    id: "02 / DIVISION",
    title: "Melhek Hospitality",
    sub: "Hotels · Restaurants · Cafés · Booking Systems",
    description:
      "Helping hotels, restaurants, and cafés serve guests better, simplify daily bookings, speed up dining orders, and increase direct business sales.",
    iconId: "hotel",
    tags: ["Hotel Bookings", "Restaurant Digital Menus", "Café Ordering"],
    delay: 0.1,
    highlights: [
      "Accept direct room bookings online and avoid high agency commissions",
      "Manage front desk, room planning, and check-ins in one calendar view",
      "Let diners view menus and place quick orders on their mobile phones",
    ],
    detailIntro:
      "Melhek Hospitality combines all accommodation and dining technology into a single division. We help hotels coordinate room availability and check-ins, while helping restaurants and cafés handle dining orders and speed up kitchen operations.",
    capabilities: [
      {
        title: "Direct Hotel Booking Engines",
        desc: "Accept room reservations and process guest bookings directly on your own website, eliminating middleman fees.",
      },
      {
        title: "Digital Menus & POS Ordering",
        desc: "Streamline restaurant and café orders with digital table menus, contactless ordering, and kitchen coordination screens.",
      },
    ],
    projectSlugs: ["luxury-hotel-management", "smart-restaurant-platform", "cafe-digital-ordering", "hotel-booking"]
  },
  {
    slug: "melhek-business-systems",
    id: "03 / DIVISION",
    title: "Melhek Business Systems",
    sub: "Inventory Tracking · Sales Dashboards · Store Management",
    description:
      "Helping retail stores, supermarkets, pharmacies, and wellness centers manage inventory, automate billing, and track sales without errors.",
    iconId: "construction",
    tags: ["Inventory Management", "Sales & Billing", "Multi-branch Sync"],
    delay: 0.2,
    highlights: [
      "Track inventory levels automatically and get alerts when stock runs low",
      "Speed up checkout counter queues with easy barcode scanning and billing",
      "Monitor sales totals and store performance from any computer",
    ],
    detailIntro:
      "Melhek Business Systems focuses on operational efficiency. We replace manual stock counting and paperwork with clear management dashboards, helping retail shops, supermarkets, pharmacies, and gyms run smoothly and track progress.",
    capabilities: [
      {
        title: "Sales & Inventory Organizers",
        desc: "Auto-update stock counts during checkouts, alert managers about expiration dates, and simplify stock reordering.",
      },
      {
        title: "Operational Dashboards",
        desc: "See daily sales, monitor cashier lanes, manage member registration, and generate accounting reports in one place.",
      },
    ],
    projectSlugs: ["pharmacy-management", "retail-management-system", "supermarket-management", "gym-management"]
  },
  {
    slug: "melhek-ai-labs",
    id: "04 / DIVISION",
    title: "Melhek AI Labs",
    sub: "Automating Tasks · Smarter Operations · Business Data",
    description:
      "Helping businesses automate repetitive administrative tasks, summarize large corporate databases, and make smarter decisions.",
    iconId: "brain",
    tags: ["Task Automation", "Smarter Decisions", "Data Summaries"],
    delay: 0.3,
    highlights: [
      "Free your staff from repetitive data entry and document processing",
      "Find patterns in your sales data to reduce unnecessary waste",
      "Search and summarize large folders of text in seconds",
    ],
    detailIntro:
      "Melhek AI Labs focuses on real-world outcomes. We build systems that automate time-consuming administrative tasks, find cost-saving bottlenecks in your operations, and translate raw spreadsheets into clear business decisions.",
    capabilities: [
      {
        title: "Automated Administrative Tasks",
        desc: "Systems that automatically process intake sheets, route files, and organize schedules without manual effort.",
      },
      {
        title: "Data Insights & Summaries",
        desc: "Summarize thousands of transaction records or document files into simple lists of highlights and recommendations.",
      },
    ],
    projectSlugs: ["ai-dashboard", "analytics-systems"]
  },
  {
    slug: "melhek-secure",
    id: "05 / DIVISION",
    title: "Melhek Secure",
    sub: "Protecting Data · Customer Security · Asset Safety",
    description:
      "Future Division — Protecting your business systems, securing customer information, and safeguarding digital assets against modern threats.",
    iconId: "shield",
    tags: ["Data Safety", "Customer Privacy", "Threat Protection"],
    delay: 0.4,
    highlights: [
      "Keep customer credentials and payment history strictly secure",
      "Protect your computers and local databases from unauthorized access",
      "Align your business operations with modern security guidelines",
    ],
    detailIntro:
      "Melhek Secure establishes robust security protocols to protect your files, records, and databases. We guard your system integrity, keeping customer details safe and operations online.",
    capabilities: [
      {
        title: "Security & Access Control",
        desc: "Enforcing secure employee login procedures and managing access permissions to keep files protected.",
      },
      {
        title: "Threat Assessments",
        desc: "Analyzing your computer setups and database servers to fix security gaps before they cause issues.",
      },
    ],
    projectSlugs: []
  },
  {
    slug: "melhek-infrastructure",
    id: "06 / DIVISION",
    title: "Melhek Infrastructure",
    sub: "Office Networking · Smart Devices · Stable Connections",
    description:
      "Future Division — Installing reliable physical networks, stable office internet connections, and smart technology foundations for modern buildings.",
    iconId: "server",
    tags: ["Office Internet", "Network Cabling", "Smart Facilities"],
    delay: 0.5,
    highlights: [
      "Ensure fast, drop-free Wi-Fi and network coverage throughout your office",
      "Set up backup power and internet connections so you never go offline",
      "Connect building devices and smart sensors to a central dashboard",
    ],
    detailIntro:
      "Melhek Infrastructure coordinates the physical networks that keep your business online. We wire offices, configure local routers, and build stable local networks that support daily office operations.",
    capabilities: [
      {
        title: "Stable Local Networks",
        desc: "Designing and installing office routers, Wi-Fi access points, and cabling layouts for fast file sharing and internet.",
      },
      {
        title: "Smart Building Setup",
        desc: "Connecting security cameras, smart locks, and sensor systems to unified controls that can be monitored on a phone.",
      },
    ],
    projectSlugs: []
  },
];

export function getDivisionBySlug(slug: string): Division | undefined {
  return DIVISIONS.find((d) => d.slug === slug);
}

export function getAllDivisionSlugs(): string[] {
  return DIVISIONS.map((d) => d.slug);
}
