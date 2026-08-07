import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/pharmacy", "/pharmacy/", "/verification-demo"],
      },
    ],
    sitemap: "https://melhek.tech/sitemap.xml",
  };
}
