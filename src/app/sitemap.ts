import type { MetadataRoute } from "next";

const baseUrl = "https://www.pitdrives.com";

const pages = [
  { path: "", updatedAt: "2026-11-20" },
  { path: "/executives", updatedAt: "2026-11-20" },
  { path: "/hotels", updatedAt: "2026-11-20" },
  { path: "/corporate", updatedAt: "2026-11-20" },
  { path: "/events", updatedAt: "2026-11-20" },
  { path: "/diplomatic", updatedAt: "2026-11-20" },
  { path: "/dc-events/kennedy-center-honors", updatedAt: "2026-11-21" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, updatedAt }) => ({
    url: `${baseUrl}${path}`,
    ...(updatedAt ? { lastModified: updatedAt } : {}),
  }));
}