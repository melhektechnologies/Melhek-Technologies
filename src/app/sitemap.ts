import type { MetadataRoute } from "next";
import { getAllDivisionSlugs } from "@/constants/divisions";
import { getAllProjectSlugs } from "@/data/projects";

const BASE_URL = "https://melhek.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/engineering",
    "/portfolio",
    "/pricing",
    "/privacy",
    "/security",
    "/terms",
  ];

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const portfolioPages: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const ecosystemPages: MetadataRoute.Sitemap = getAllDivisionSlugs().map((slug) => ({
    url: `${BASE_URL}/ecosystem/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...portfolioPages, ...ecosystemPages];
}
