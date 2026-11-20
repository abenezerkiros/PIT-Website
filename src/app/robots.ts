import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "PerplexityBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.pitdrives.com/sitemap.xml",
  };
}