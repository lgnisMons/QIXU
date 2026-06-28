/**
 * QIXU 启序 — Centralized Site Configuration
 *
 * Single source of truth for all site-level data.
 * All UI components must consume this configuration;
 * no hardcoded values in components.
 *
 * To modify site content, edit this file only.
 */

// ---------------------------------------------------------------------------
// Site Identity
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "QIXU 启序",
  nameEn: "QIXU",
  nameZh: "启序",
  slogan: "启于今日，序向未来",
  tagline: "AI 时代学习成长平台",
  philosophy: "启蒙 · 序章 · 未来",
  description:
    "启于今日，序向未来。QIXU 启序是一个 AI 时代的学习成长平台，" +
    "提供 AI 学习助手、真人导师陪伴、成长档案和志愿规划服务。",
  url: "https://qixu.app",
} as const;

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const seoConfig = {
  defaultTitle: `${siteConfig.name} - ${siteConfig.tagline}`,
  titleTemplate: `%s | ${siteConfig.name}`,
  description: siteConfig.description,
  /**
   * Keywords naturally included in page content and metadata.
   * No keyword stuffing — these reflect actual product capabilities.
   */
  keywords: [
    "深圳家教",
    "AI学习助手",
    "AI工具课堂",
    "高考志愿推荐",
  ] as string[],
} as const;

// ---------------------------------------------------------------------------
// Contact Information
// ---------------------------------------------------------------------------

export const contactConfig = {
  email: "qixu_s@163.com",
  phone: "待更新",
  address: "深圳市",
  workHours: "预约制",
  wechatQr: {
    /** Placeholder — replace with actual QR image path */
    placeholder: true,
  },
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  { title: "首页", href: "/" },
  { title: "AI能力", href: "/ai", description: "AI 助手 · AI 创作 · Agent 开发" },
  { title: "导师团队", href: "/tutor", description: "资深教育者 · 行业专家" },
  { title: "学习工具", href: "/tools", description: "AI 工具推荐 · 学习资源" },
  { title: "成长社区", href: "/community", description: "成长分享 · 交流互动" },
  { title: "关于启序", href: "/about", description: "品牌故事 · 成长理念" },
] as const;

export const footerNav = {
  产品服务: [
    { title: "AI 学习助手", href: "/ai" },
    { title: "导师团队", href: "/tutor" },
    { title: "学习工具", href: "/tools" },
    { title: "成长社区", href: "/community" },
  ],
  关于我们: [
    { title: "品牌故事", href: "/about" },
    { title: "成长理念", href: "/about" },
    { title: "联系我们", href: "/contact" },
    { title: "加入我们", href: "/about" },
  ],
  支持: [
    { title: "帮助中心", href: "/community" },
    { title: "隐私政策", href: "/about" },
    { title: "服务条款", href: "/about" },
    { title: "意见反馈", href: "/contact" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Social Links
// ---------------------------------------------------------------------------

export const socialLinks = {
  wechat: {
    label: "微信公众号",
    /** Placeholder — replace with actual account */
    id: "待开通",
  },
  xiaohongshu: {
    label: "小红书",
    /** Placeholder */
    id: "待开通",
  },
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footerConfig = {
  copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`,
  legalLinks: [
    { title: "隐私政策", href: "/about" },
    { title: "服务条款", href: "/about" },
    { title: "联系我们", href: "/contact" },
  ],
} as const;
