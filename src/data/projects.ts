import type { Project } from "@/types/project";

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    name: "Amen Car Import",
    category: "Automotive · Luxury",
    description:
      "A premium digital showroom for high-end vehicle imports, featuring immersive visualizations and a streamlined executive acquisition funnel.",
    gradient: "from-blue-600/20 to-melhek-navy/80",
    iconName: "Car",
    slug: "amen-car-import",
    image: "/portfolio/amen-car-import.png",
    tags: ["Next.js", "Motion Design", "Luxury UX"],
    link: "https://amencarimport.com"
  },
  {
    id: "2",
    name: "Happy Optics",
    category: "Healthcare Tech",
    description:
      "An elite vision clinic platform providing seamless patient management, digital prescriptions, and an enterprise-grade appointment ecosystem.",
    gradient: "from-purple-600/20 to-melhek-navy/80",
    iconName: "Eye",
    slug: "happy-optics",
    image: "/portfolio/happy-optics.png",
    tags: ["SaaS", "Healthcare", "Dashboards"],
  },
  {
    id: "3",
    name: "Kidist Arsema",
    category: "E-commerce · Fashion",
    description:
      "A luxury traditional Ethiopian clothing brand's digital flagship, blending cultural heritage with precision e-commerce engineering.",
    gradient: "from-orange-600/20 to-melhek-navy/80",
    iconName: "ShoppingBag",
    slug: "kidist-arsema",
    image: "/portfolio/kidist-arsema.png",
    tags: ["Luxury E-comm", "Branding", "Direct-to-Consumer"],
  },
  {
    id: "4",
    name: "Pharmacy Management System",
    category: "Healthcare Tech",
    description:
      "A robust operational engine for pharmacies, automating inventory, sales tracking, and regulatory compliance with real-time analytics.",
    gradient: "from-emerald-600/20 to-melhek-navy/80",
    iconName: "Pill",
    slug: "pharmacy-management",
    image: "/portfolio/pharmacy-management.png",
    tags: ["Automation", "Inventory Control", "Reporting"],
  },
  {
    id: "5",
    name: "Elite Gym Management",
    category: "Fitness · SaaS",
    description:
      "Comprehensive fitness center infrastructure for membership tracking, payment automation, and personalized workout orchestration.",
    gradient: "from-red-600/20 to-melhek-navy/80",
    iconName: "Dumbbell",
    slug: "gym-management",
    image: "/portfolio/gym-management.png",
    tags: ["Member Mgmt", "Fintech", "Schedules"],
  },
  {
    id: "6",
    name: "Belete Tasew Law Firm",
    category: "Legal Tech",
    description:
      "A high-end professional digital presence for one of Addis Ababa's top legal practices, focusing on trust, authority, and case discovery.",
    gradient: "from-slate-600/20 to-melhek-navy/80",
    iconName: "Scale",
    slug: "belete-tasew-law",
    image: "/portfolio/belete-tasew-law.png",
    tags: ["Professional Services", "Lead Gen", "Security"],
  },
];


export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS_DATA.map((p) => p.slug);
}
