/**
 * QIXU 启序 — Site Configuration (Umbrella)
 *
 * Re-exports all modular configuration files.
 * Import individual modules directly for granular usage,
 * or import from `@qixu/config/site` for the full umbrella.
 *
 * Modules:
 *   @qixu/config/brand       — brand identity
 *   @qixu/config/contact     — contact information
 *   @qixu/config/navigation  — main nav, footer nav, routes
 *   @qixu/config/seo         — SEO defaults, JSON-LD
 *   @qixu/config/social      — social media links
 */

export { brandConfig, brandConfig as siteConfig } from "./brand";
export { contactConfig } from "./contact";
export { mainNav, footerNav, ROUTES } from "./navigation";
export type { NavItem } from "./navigation";
export { seoConfig, organizationJsonLd } from "./seo";
export { socialLinks } from "./social";

import { brandConfig } from "./brand";

/** Footer configuration — depends on brandConfig */
export const footerConfig = {
  copyright: `© ${new Date().getFullYear()} ${brandConfig.name}. All rights reserved.`,
  legalLinks: [
    { title: "隐私政策", href: "/about" },
    { title: "服务条款", href: "/about" },
    { title: "联系我们", href: "/contact" },
  ],
} as const;
