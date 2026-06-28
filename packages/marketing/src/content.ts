/**
 * Marketing Content Layer — structured product data for all channels.
 *
 * Pulls from @qixu/config to ensure zero duplicated copywriting.
 * All marketing assets must be generated from this single source.
 */

// These are bundled as inline constants to avoid workspace dependency
// since @qixu/marketing may be used in non-Node build contexts (Remotion bundle).

const BRAND = {
  name: "QIXU 启序", nameEn: "QIXU", nameZh: "启序",
  slogan: "启于今日，序向未来",
  tagline: "AI 时代学习成长平台",
  philosophy: "启蒙 · 序章 · 未来",
  url: "https://qixu.app",
};

const SEO_KEYWORDS = [
  "深圳家教", "AI学习助手", "AI工具课堂", "高考志愿推荐",
  "免费志愿推荐", "高考位次推荐", "AI志愿填报",
];

// ---------------------------------------------------------------------------
// Feature Descriptions (structured, reusable)
// ---------------------------------------------------------------------------

export interface FeatureContent {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  pitch: string; // short marketing hook
  keywords: string[];
  cta: string;
  route: string;
}

export const productFeatures: FeatureContent[] = [
  {
    id: "ai-assistant", title: "AI 学习助手", shortTitle: "AI助手",
    description: "智能答疑、自适应推荐、学情分析。AI辅助发现知识薄弱点，让学习更高效。",
    pitch: "每个学习者都应该有一个AI学习伙伴",
    keywords: ["AI学习", "智能辅导", "自适应学习"],
    cta: "免费测评", route: "/assessment",
  },
  {
    id: "tutor", title: "真人导师陪伴", shortTitle: "导师陪伴",
    description: "来自深圳及周边高校的真实导师，AI与真人协同，互补长短。",
    pitch: "AI做不了的事情，交给真正的导师",
    keywords: ["导师", "1对1", "真人辅导"],
    cta: "了解导师", route: "/tutor",
  },
  {
    id: "growth", title: "成长档案", shortTitle: "成长档案",
    description: "记录学习每一刻，可视化成长轨迹。能力雷达图、学习历程、成果展示。",
    pitch: "让每一次进步都被看见",
    keywords: ["成长记录", "学习档案", "能力追踪"],
    cta: "查看档案", route: "/growth",
  },
  {
    id: "admission", title: "高考志愿推荐", shortTitle: "志愿推荐",
    description: "基于录取数据和规则引擎，提供冲稳保三梯度志愿推荐方案，含费用分析。",
    pitch: "每一分都用在刀刃上",
    keywords: ["高考志愿", "冲稳保", "免费推荐", "位次分析"],
    cta: "免费推荐", route: "/admission",
  },
  {
    id: "assessment", title: "AI 学习测评", shortTitle: "学习测评",
    description: "多维度学习评估，生成个性化学习画像与成长建议。5步完成，即刻出报告。",
    pitch: "3分钟了解你的学习基因",
    keywords: ["测评", "学习诊断", "个性化"],
    cta: "开始测评", route: "/assessment",
  },
];

// ---------------------------------------------------------------------------
// Brand Stories (for video scripts & social)
// ---------------------------------------------------------------------------

export interface BrandStory {
  id: string;
  title: string;
  angle: string;
  script: string; // approx 30s voiceover
  emotion: "inspire" | "educate" | "empower" | "trust";
}

export const brandStories: BrandStory[] = [
  {
    id: "origin",
    title: "启序的起源",
    angle: "为什么我们需要一个新的教育平台？",
    emotion: "inspire",
    script: `在AI改变一切的时代，教育却似乎停留在过去。我们相信，AI不应该取代老师——它应该让每个学习者都能获得以前只有少数人才能享受的个性化关注。所以，我们创造了${BRAND.name}。${BRAND.slogan}。`,
  },
  {
    id: "growth-sequence",
    title: "成长序列",
    angle: "什么是「成长序列」？",
    emotion: "educate",
    script: `每个人的成长都是独一无二的。${BRAND.name}不会给你套用一个模板——AI诊断你的起点，导师引导你的路径，你走出的每一步，都是属于自己的成长序列。启蒙·序章·未来。`,
  },
  {
    id: "admission-story",
    title: "填志愿不必焦虑",
    angle: "高考志愿推荐功能",
    emotion: "empower",
    script: `高考分数出来了，但填志愿比考试还让人紧张。${BRAND.name}的志愿推荐系统，基于真实录取数据，给你冲刺、稳妥、保底三个梯度——还会告诉你每所学校的费用和城市生活成本。重点是：完全免费。`,
  },
  {
    id: "ai-tutor-story",
    title: "AI+导师，不是二选一",
    angle: "为什么AI和导师都要有？",
    emotion: "trust",
    script: `AI可以7×24小时回答你的问题，但当你在深夜感到迷茫时，AI不懂你的心情。${BRAND.name}把AI的高效和导师的温度结合起来——AI帮你找问题，导师陪你解决问题。`,
  },
];

// ---------------------------------------------------------------------------
// Social Hooks (pre-written social media captions)
// ---------------------------------------------------------------------------

export interface SocialHook {
  platform: string;
  hooks: string[];
  hashtags: string[];
}

export const socialHooks: SocialHook[] = [
  {
    platform: "douyin",
    hooks: [
      "高考志愿怎么填？免费工具来了 #高考志愿 #AI填报",
      "3分钟测出你的学习短板 #学习测评 #AI学习",
      "深圳家长都在用的学习平台 #深圳家教 #AI助手",
    ],
    hashtags: ["#高考志愿", "#AI学习", "#深圳家教", "#志愿填报", "#学习方法"],
  },
  {
    platform: "xiaohongshu",
    hooks: [
      "📚 高考志愿填报保姆级攻略｜免费AI推荐工具",
      "✨ 3分钟测出你的学习风格｜深圳学霸都在用",
      "🎓 志愿推荐冲·稳·保三步法｜附费用分析",
    ],
    hashtags: ["#高考志愿", "#AI学习助手", "#学习方法", "#深圳家教", "#志愿填报指南"],
  },
  {
    platform: "bilibili",
    hooks: [
      "【高考志愿】别再瞎填了！这个免费工具帮你科学决策",
      "【学习测评】AI+真人导师，这个教育平台有点东西",
      "【深度体验】用了30天QIXU，我的学习效率发生了什么变化",
    ],
    hashtags: ["#高考志愿", "#AI学习", "#教育科技", "#学习方法", "#深圳家教"],
  },
  {
    platform: "wechat",
    hooks: [
      "高考志愿填报，这可能是今年最实用的免费工具",
      "AI学习助手来了：每个孩子都值得有个学习伙伴",
      "深圳高校导师团队入驻：让真正懂教育的人陪伴成长",
    ],
    hashtags: ["#AI学习助手", "#高考志愿推荐", "#深圳家教"],
  },
];

// ---------------------------------------------------------------------------
// SEO Content Blocks (ready-to-use for landing pages)
// ---------------------------------------------------------------------------

export const seoContentBlocks = {
  admission: {
    h1: "高考志愿推荐 — 免费AI志愿填报助手",
    h2: "输入分数位次，获取冲稳保三梯度方案",
    metaDescription: "QIXU免费AI志愿填报，基于录取数据规则引擎，提供冲刺/稳妥/保底三梯度推荐，含费用分析和职业建议。",
    keywords: SEO_KEYWORDS.filter((k) => k.includes("志愿") || k.includes("高考")),
    faq: [
      { q: "高考志愿推荐免费吗？", a: "完全免费。QIXU的志愿推荐功能对全体用户永久免费。没有隐藏收费。" },
      { q: "推荐数据准确吗？", a: "当前基于2025年广东省模拟数据。未来将接入官方数据源。推荐结果仅供参考，正式填报以省考试院为准。" },
      { q: "冲稳保是什么意思？", a: "「冲刺」≈位次接近往年录取线；「稳妥」≈位次高于录取线；「保底」≈位次远超录取线，录取把握极大。" },
    ],
  },
  assessment: {
    h1: "AI 学习测评 — 3分钟了解你的学习基因",
    h2: "5步测评，生成个性化学习报告",
    metaDescription: "免费AI学习测评。多维度评估学习能力、风格和薄弱环节，生成个性化成长建议和学习路径。",
    keywords: ["学习测评", "AI诊断", "学习方法", "个性化学习"],
    faq: [
      { q: "测评需要多长时间？", a: "大约3-5分钟。5步完成：年级→学科成绩→学习目标→学习习惯→确认提交。" },
      { q: "测评结果有什么用？", a: "生成学习画像、强弱项分析和分阶段成长建议，为后续AI学习和导师匹配提供依据。" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Re-export all brand constants for external use
// ---------------------------------------------------------------------------

export const brand = BRAND;
export const seoKeywords = SEO_KEYWORDS;
