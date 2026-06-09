export type ProjectCategory = 
  | "Hospitality Technology"
  | "Healthcare Technology"
  | "Retail Technology"
  | "Automotive Technology"
  | "Faith & Community Platforms"
  | "Business Intelligence";

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
}

export interface ProjectResponse {
  data: Project[] | null;
  error: string | null;
  loading: boolean;
}

