/**
 * QIXU 启序 — SEO Configuration
 *
 * Default metadata, OpenGraph, and structured data settings.
 * Individual pages can override via Next.js Metadata API.
 */

import { brandConfig } from "./brand";

export const seoConfig = {
  defaultTitle: `${brandConfig.name} - ${brandConfig.tagline}`,
  titleTemplate: `%s | ${brandConfig.name}`,
  description: brandConfig.description,
  keywords: [
    "深圳家教",
    "AI学习助手",
    "AI工具课堂",
    "高考志愿推荐",
  ] as string[],
  /**
   * Default OpenGraph image — replace with actual social share image.
   * Recommended: 1200×630 px.
   */
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image" as const,
  locale: "zh_CN",
  siteName: brandConfig.name,
} as const;

/** Organization JSON-LD — rendered in root layout */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: brandConfig.name,
  alternateName: brandConfig.nameEn,
  url: brandConfig.url,
  slogan: brandConfig.slogan,
  description: brandConfig.description,
};
