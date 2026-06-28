/**
 * @qixu/seo — Reusable metadata generator.
 *
 * Every page calls generateMetadata() to produce consistent,
 * standards-compliant metadata for traditional search engines
 * and AI answer engines (GEO).
 */

import type { Metadata } from "next";

export interface SEOPageInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  /** For GEO: the exact question this page answers */
  answersQuestion?: string;
}

export function generateMetadata(input: SEOPageInput, base: {
  siteName: string;
  url: string;
  defaultTitle: string;
  defaultDescription: string;
}): Metadata {
  const title = input.title.includes(base.siteName)
    ? input.title
    : `${input.title} | ${base.siteName}`;

  return {
    title,
    description: input.description.slice(0, 160),
    keywords: input.keywords,
    metadataBase: new URL(base.url),
    alternates: { canonical: input.path },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: base.siteName,
      title,
      description: input.description.slice(0, 160),
      url: `${base.url}${input.path}`,
      images: input.ogImage ? [input.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description.slice(0, 160),
    },
    robots: { index: true, follow: true },
    other: input.answersQuestion
      ? { "geo-question": input.answersQuestion }
      : undefined,
  };
}
