/**
 * QIXU 启序 — Navigation Configuration
 *
 * Centralized navigation structure for site header and footer.
 * All navigation links are defined here; no hardcoded hrefs in components.
 */

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

/** Route constants — single source of truth for all path strings */
export const ROUTES = {
  home: "/",
  ai: "/ai",
  admission: "/admission",
  tutor: "/tutor",
  tools: "/tools",
  community: "/community",
  about: "/about",
  contact: "/contact",
  dashboard: "/dashboard",
  assessment: "/assessment",
  growth: "/growth",
} as const;

export const mainNav: NavItem[] = [
  { title: "首页", href: ROUTES.home },
  { title: "AI学习", href: ROUTES.ai, description: "AI 学习助手 · 智能测评" },
  { title: "高考志愿", href: ROUTES.admission, description: "免费志愿推荐 · 冲稳保梯度" },
  { title: "导师团队", href: ROUTES.tutor, description: "深圳及周边高校导师" },
  { title: "AI工具课堂", href: ROUTES.tools, description: "AI 工具推荐 · 学习资源" },
  { title: "成长社区", href: ROUTES.community, description: "成长分享 · 交流互动" },
  { title: "关于启序", href: ROUTES.about, description: "品牌故事 · 成长理念" },
] as const;

export const footerNav = {
  产品服务: [
    { title: "AI 学习助手", href: ROUTES.ai },
    { title: "高考志愿推荐", href: ROUTES.admission },
    { title: "导师团队", href: ROUTES.tutor },
    { title: "学习工具", href: ROUTES.tools },
    { title: "成长社区", href: ROUTES.community },
  ],
  关于我们: [
    { title: "品牌故事", href: ROUTES.about },
    { title: "成长理念", href: ROUTES.about },
    { title: "联系我们", href: ROUTES.contact },
    { title: "加入我们", href: ROUTES.about },
  ],
  支持: [
    { title: "帮助中心", href: ROUTES.community },
    { title: "隐私政策", href: ROUTES.about },
    { title: "服务条款", href: ROUTES.about },
    { title: "意见反馈", href: ROUTES.contact },
  ],
} as const;
