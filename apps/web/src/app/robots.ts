import type { MetadataRoute } from "next";
import { brandConfig } from "@qixu/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/"],
    },
    sitemap: `${brandConfig.url}/sitemap.xml`,
  };
}
