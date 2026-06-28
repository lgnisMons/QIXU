/**
 * Mock data for the QIXU homepage
 *
 * All data is mocked — no backend or API integration yet.
 * Each section's data shape is designed as an extension point
 * for future Supabase tables and LangGraph integrations.
 *
 * Extension points:
 * - Supabase: Replace mock arrays with `supabase.from('table').select()`
 * - LangGraph: Replace static AI showcase content with dynamic agent state
 */

// ---------------------------------------------------------------------------
// Trust Section
// ---------------------------------------------------------------------------

export interface TrustStat {
  value: string;
  label: string;
}

export interface PartnerLogo {
  name: string;
  /** Future: Supabase public URL */
  src?: string;
}

export const trustStats: TrustStat[] = [
  { value: "50,000+", label: "学习成长者" },
  { value: "500+", label: "认证导师" },
  { value: "98%", label: "满意度" },
  { value: "30+", label: "覆盖学科领域" },
];

export const partnerLogos: PartnerLogo[] = [
  { name: "清华大学" },
  { name: "北京大学" },
  { name: "中国科学技术大学" },
  { name: "浙江大学" },
  { name: "华为教育" },
  { name: "腾讯课堂" },
];

// ---------------------------------------------------------------------------
// Growth Sequence Section
// ---------------------------------------------------------------------------

export interface GrowthStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: "compass" | "layers" | "rocket";
  /** Future: LangGraph agent state key */
  agentStateKey?: string;
}

export const growthStages: GrowthStage[] = [
  {
    id: "enlightenment",
    title: "启蒙",
    subtitle: "Enlightenment",
    description:
      "发现兴趣所在，认识自我潜能。通过 AI 智能诊断，找到最适合你的成长起点。",
    icon: "compass",
    agentStateKey: "enlightenment_stage",
  },
  {
    id: "sequence",
    title: "序章",
    subtitle: "Sequence",
    description:
      "构建知识体系，建立学习节奏。在导师引导下，形成属于自己的成长序列。",
    icon: "layers",
    agentStateKey: "sequence_stage",
  },
  {
    id: "future",
    title: "未来",
    subtitle: "Future",
    description:
      "自由探索，实现潜能。从被动学习走向主动创造，开创无限可能的未来。",
    icon: "rocket",
    agentStateKey: "future_stage",
  },
];

// ---------------------------------------------------------------------------
// Four Core Capabilities
// ---------------------------------------------------------------------------

export interface Capability {
  id: string;
  icon: "brain" | "users" | "chart" | "route";
  title: string;
  description: string;
  highlights: string[];
}

export const capabilities: Capability[] = [
  {
    id: "ai-assistant",
    icon: "brain",
    title: "AI 学习助手",
    description:
      "24/7 全天候学习伙伴，智能答疑、自适应推荐、学情分析，让每个学习者都能获得个性化关注。",
    highlights: ["智能答疑", "自适应推荐", "学情分析", "多模态交互"],
  },
  {
    id: "mentor-guidance",
    icon: "users",
    title: "导师全程指导",
    description:
      "来自顶尖高校和行业的资深导师，为学习者提供真实、有温度的引导和反馈。",
    highlights: ["1对1辅导", "进度跟踪", "能力评估", "成长规划"],
  },
  {
    id: "growth-portfolio",
    icon: "chart",
    title: "成长档案",
    description:
      "记录学习的每一个重要时刻，可视化成长轨迹，让进步看得见、可分享。",
    highlights: ["能力雷达图", "学习历程", "成果展示", "证书档案"],
  },
  {
    id: "personalized-path",
    icon: "route",
    title: "个性化路径",
    description:
      "基于 AI 诊断和导师建议，为每个学习者定制独一无二的成长路径，不套用统一模板。",
    highlights: ["AI 诊断起点", "动态调整路径", "目标导向学习", "多路径探索"],
  },
];

// ---------------------------------------------------------------------------
// Tutor Team Section
// ---------------------------------------------------------------------------

export interface Tutor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialties: string[];
  bio: string;
  /** Future: Supabase relation */
  userId?: string;
}

export const tutors: Tutor[] = [
  {
    id: "tutor-1",
    name: "张明远",
    title: "数学与逻辑思维导师",
    avatar: "",
    specialties: ["数学思维", "逻辑推理", "竞赛指导"],
    bio: "清华大学数学博士，10 年教学经验，擅长引导学生建立数学思维框架。",
    userId: undefined,
  },
  {
    id: "tutor-2",
    name: "李思涵",
    title: "语言与人文素养导师",
    avatar: "",
    specialties: ["中英双语", "阅读写作", "人文素养"],
    bio: "北京大学中文系毕业，哈佛大学教育学硕士，专注于语言教育的人文关怀。",
    userId: undefined,
  },
  {
    id: "tutor-3",
    name: "王子轩",
    title: "科学实验与探究导师",
    avatar: "",
    specialties: ["物理实验", "科学探究", "跨学科项目"],
    bio: "中国科学技术大学物理学博士，热爱将抽象科学原理转化为有趣的实验。",
    userId: undefined,
  },
  {
    id: "tutor-4",
    name: "陈晓雨",
    title: "编程与 AI 启蒙导师",
    avatar: "",
    specialties: ["编程入门", "AI 素养", "创意编程"],
    bio: "浙江大学计算机硕士，致力于让每个孩子都能理解 AI 时代的基础逻辑。",
    userId: undefined,
  },
  {
    id: "tutor-5",
    name: "林若溪",
    title: "艺术与创造力导师",
    avatar: "",
    specialties: ["视觉艺术", "创意设计", "审美素养"],
    bio: "中央美术学院设计学硕士，倡导通过艺术教育培养创造性思维。",
    userId: undefined,
  },
  {
    id: "tutor-6",
    name: "赵一航",
    title: "学习方法与认知导师",
    avatar: "",
    specialties: ["学习科学", "时间管理", "专注力训练"],
    bio: "北京师范大学认知心理学博士，用科学方法帮助学习者提升学习效率。",
    userId: undefined,
  },
];

// ---------------------------------------------------------------------------
// AI Showcase Section
// ---------------------------------------------------------------------------

export interface AICapability {
  id: string;
  title: string;
  description: string;
  icon: "sparkles" | "target" | "trendingUp";
  features: string[];
  /** Future: LangGraph agent name / graph id */
  langGraphAgent?: string;
}

export const aiCapabilities: AICapability[] = [
  {
    id: "ai-diagnostic",
    title: "智能诊断",
    description:
      "基于多维度能力模型，精准定位学习者的知识薄弱点和能力边界，生成个性化诊断报告。",
    icon: "target",
    features: [
      "多学科能力测评",
      "知识图谱分析",
      "薄弱点定位",
      "可视化诊断报告",
    ],
    langGraphAgent: "diagnostic_agent",
  },
  {
    id: "ai-adaptive",
    title: "自适应学习",
    description:
      "根据学习者的实时表现和状态，动态调整学习内容和难度，实现真正的因材施教。",
    icon: "sparkles",
    features: [
      "实时难度调节",
      "知识关联推荐",
      "学习风格适配",
      "遗忘曲线优化",
    ],
    langGraphAgent: "adaptive_agent",
  },
  {
    id: "ai-prediction",
    title: "成长预测",
    description:
      "基于学习数据和认知科学模型，预测学习者的成长曲线，提前发现潜力与风险。",
    icon: "trendingUp",
    features: [
      "成长趋势预测",
      "潜力领域发现",
      "风险预警提示",
      "个性化建议生成",
    ],
    langGraphAgent: "prediction_agent",
  },
];

// ---------------------------------------------------------------------------
// Success Stories (Placeholder)
// ---------------------------------------------------------------------------

export interface SuccessStory {
  id: string;
  studentName: string;
  studentTitle: string;
  avatar: string;
  quote: string;
  achievement: string;
  /** Future: Supabase relation */
  userId?: string;
}

export const successStories: SuccessStory[] = [
  {
    id: "story-1",
    studentName: "刘同学",
    studentTitle: "高中生 · 数学竞赛省一等奖",
    avatar: "",
    quote:
      "在导师的引导下，我发现自己对数学的热爱不仅仅是解题，而是理解背后的逻辑之美。AI 助手帮我找到了最薄弱的知识点，让复习效率提升了很多。",
    achievement: "数学竞赛省一等奖",
  },
  {
    id: "story-2",
    studentName: "王同学",
    studentTitle: "初中生 · 编程爱好者",
    avatar: "",
    quote:
      "从对编程一无所知到能独立完成一个小项目，QIXU 的个性化路径让我按自己的节奏学习，没有压力，只有成就感。",
    achievement: "完成首个独立编程项目",
  },
  {
    id: "story-3",
    studentName: "陈同学",
    studentTitle: "小学生 · 英语能力飞跃",
    avatar: "",
    quote:
      "以前最怕英语课，现在最喜欢。林老师教会了我用有趣的方式记单词，AI 助手像一个随时都在的语伴，让我不再害怕开口。",
    achievement: "英语能力提升三个等级",
  },
];
