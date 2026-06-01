export type ProjectCategory = 
  | "Hospitality Tech"
  | "Healthcare Tech"
  | "Automotive · Luxury"
  | "Legal Tech"
  | "Fitness · SaaS"
  | "E-commerce · Fashion"
  | "Business Automation";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  description: string;
  gradient: string;
  iconName: string;
  slug: string;
  image?: string;
  link?: string;
  tags?: string[];
}

export interface ProjectResponse {
  data: Project[] | null;
  error: string | null;
  loading: boolean;
}

