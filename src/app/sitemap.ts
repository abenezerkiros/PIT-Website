import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.pitdrives.com";

  // Replace these paths with the exact URLs used by your live pages.
  const routes = [
    "",
    "/executives",
    "/hotels",
    "/corporate",
    "/events",
    "/diplomatic",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));
}