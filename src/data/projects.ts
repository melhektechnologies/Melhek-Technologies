import type { Project } from "@/types/project";

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    name: "Luxury Hotel Management System",
    category: "Hospitality Tech",
    description:
      "Full-stack PMS with real-time booking, analytics, and smart concierge integration.",
    gradient: "from-blue-600/20 to-melhek-navy/80",
    iconName: "Hotel",
    slug: "luxury-hotel-management",
  },
  {
    id: "2",
    name: "Pharmacy Management Platform",
    category: "Healthcare Tech",
    description:
      "Inventory, prescriptions, sales analytics, and patient management in one system.",
    gradient: "from-emerald-600/20 to-melhek-navy/80",
    iconName: "Pill",
    slug: "pharmacy-management",
  },
  {
    id: "3",
    name: "Car Sales Digital Showroom",
    category: "Automotive · Commerce",
    description:
      "Immersive digital auto dealership with 3D configurator and smart lead capture.",
    gradient: "from-orange-600/20 to-melhek-navy/80",
    iconName: "Car",
    slug: "car-sales-showroom",
  },
  {
    id: "4",
    name: "Happy Optics Vision Platform",
    category: "Healthcare · Vision",
    description:
      "Patient portal, appointment booking, and eyewear catalog for vision clinics.",
    gradient: "from-purple-600/20 to-melhek-navy/80",
    iconName: "Eye",
    slug: "happy-optics",
  },
  {
    id: "5",
    name: "Smart Restaurant Digital Menu",
    category: "Food & Beverage Tech",
    description:
      "QR-driven digital menus with real-time updates, order tracking, and analytics.",
    gradient: "from-red-600/20 to-melhek-navy/80",
    iconName: "Utensils",
    slug: "smart-restaurant",
  },
  {
    id: "6",
    name: "Financial Analytics Dashboard",
    category: "Finance · Analytics",
    description:
      "Real-time financial intelligence with predictive modeling and automated reporting.",
    gradient: "from-cyan-600/20 to-melhek-navy/80",
    iconName: "TrendingUp",
    slug: "financial-analytics",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS_DATA.map((p) => p.slug);
}
