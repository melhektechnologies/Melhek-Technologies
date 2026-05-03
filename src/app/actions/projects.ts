"use server"

import { PROJECTS_DATA } from "@/data/projects";
import type { Project } from "@/types/project";

export async function getProjects(): Promise<{ data: Project[] | null, error: string | null }> {
  try {
    // Simulating network delay for production feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real production app, this would be a database call like:
    // const data = await db.project.findMany();
    
    return { data: PROJECTS_DATA, error: null };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { data: null, error: "Critical failure while synchronizing with project repository. Please try again." };
  }
}
