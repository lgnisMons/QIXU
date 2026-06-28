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

export const contactInfo = {
  email: "hello@qixu.com",
  phone: "400-888-8888",
  address: "深圳市南山区科技园",
  workHours: "周一至周日 9:00-21:00",
};
