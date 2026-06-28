import type { MetadataRoute } from "next";
import { brandConfig } from "@qixu/config/brand";
import { ROUTES } from "@qixu/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brandConfig.url;

  const staticRoutes = [
    { url: ROUTES.home, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: ROUTES.ai, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: ROUTES.tutor, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: ROUTES.tools, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: ROUTES.community, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: ROUTES.about, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: ROUTES.contact, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
