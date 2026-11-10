import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/pharmacy",
          "/pharmacy/",
          "/verification-demo",
          "/pricing/desk",
          "/pricing/desk/",
          "/pricecalculator",
          "/pricecalculator/",
          "/internal/commercial-documents",
          "/internal/commercial-documents/",
        ],
      },
    ],
    sitemap: "https://melhek.tech/sitemap.xml",
  };
}
