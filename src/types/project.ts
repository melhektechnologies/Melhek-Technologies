export type ProjectCategory = 
  | "Hospitality"
  | "Healthcare"
  | "Retail & Commerce"
  | "Professional Services"
  | "Community & Faith"
  | "Fitness & Wellness"
  | "Automotive";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  sector: string;
  description: string;
  gradient: string;
  iconName: string;
  slug: string;
  image?: string;
  link?: string;
  tags?: string[];
  businessOutcome: string;
  techCapability: string;
  scalability: string;
  status?: string;
}

export interface ProjectResponse {
  data: Project[] | null;
  error: string | null;
  loading: boolean;
}

