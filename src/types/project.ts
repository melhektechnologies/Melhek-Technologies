import { ReactNode } from 'react';

export type ProjectCategory = 
  | "Hospitality Tech"
  | "Healthcare Tech"
  | "Automotive · Commerce"
  | "Healthcare · Vision"
  | "Food & Beverage Tech"
  | "Finance · Analytics";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  description: string;
  gradient: string;
  iconName: string; // Storing icon name as string for serializability if needed
  slug: string;
}

export interface ProjectResponse {
  data: Project[] | null;
  error: string | null;
  loading: boolean;
}
