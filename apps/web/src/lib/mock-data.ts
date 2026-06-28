/**
 * Mock data for the QIXU homepage — Reality Layer (Sprint-004)
 *
 * Principles:
 * - No fabricated people, metrics, or endorsements.
 * - All mock content is clearly marked as replaceable.
 * - Each section has a documented extension point.
 *
 * Extension points:
 * - Supabase: Replace mock arrays with `supabase.from('table').select()`
 * - LangGraph: Replace static content with dynamic agent state
 */

// ---------------------------------------------------------------------------
// Trust Section — Capability Badges
// ---------------------------------------------------------------------------

export interface CapabilityBadge {
  label: string;
  /** "active" | "planned" | "coming-soon" */
  statusLabel: string;
  status: "active" | "planned";
}

export const capabilityBadges: CapabilityBadge[] = [
  { label: "AI 学习助手", statusLabel: "已上线", status: "active" },
  { label: "真人导师陪伴", statusLabel: "已上线", status: "active" },
  { label: "成长档案", statusLabel: "内测中", status: "active" },
  { label: "志愿规划", statusLabel: "规划中", status: "planned" },
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
      "智能答疑、自适应推荐、学情分析。AI 辅助学习者发现问题、巩固知识，让每个学习者都能获得个性化关注。",
    highlights: ["智能答疑", "自适应推荐", "学情分析"],
  },
  {
    id: "mentor-guidance",
    icon: "users",
    title: "真人导师陪伴",
    description:
      "来自深圳及周边高校的导师团队，为学习者提供真实、有温度的引导和反馈。AI 与真人协同，互补长短。",
    highlights: ["1对1指导", "进度跟踪", "成长规划"],
  },
  {
    id: "growth-portfolio",
    icon: "chart",
    title: "成长档案",
    description:
      "记录学习的每一个重要时刻，可视化成长轨迹，让进步看得见、可分享。",
    highlights: ["学习历程", "成果展示", "能力雷达"],
  },
  {
    id: "personalized-path",
    icon: "route",
    title: "志愿规划",
    description:
      "基于 AI 分析和导师经验，为高中阶段学习者提供高考志愿推荐参考。目前仍在规划测试中。",
    highlights: ["高考志愿分析", "院校匹配", "专业推荐（规划中）"],
  },
];

// ---------------------------------------------------------------------------
// Tutor Team Section — Real Profiles
// ---------------------------------------------------------------------------

export interface Tutor {
  id: string;
  name: string;
  title: string;
  school: string;
  avatar: string;
  specialties: string[];
  bio: string;
  /** Future: Supabase relation */
  userId?: string;
}

export const tutors: Tutor[] = [
  {
    id: "tutor-yang-1",
    name: "杨老师",
    title: "AI 与编程导师",
    school: "暨南大学",
    avatar: "",
    specialties: ["AI 素养", "编程入门", "电子信息"],
    bio: "暨南大学电子与信息工程硕士，专注 AI 素养教育与编程启蒙，引导学生建立面向未来的技术视野。",
    userId: undefined,
  },
  {
    id: "tutor-liao",
    name: "廖老师",
    title: "数学与逻辑思维导师",
    school: "中山大学",
    avatar: "",
    specialties: ["数学思维", "逻辑推理", "竞赛指导"],
    bio: "中山大学数学系硕士，擅长数学思维训练与逻辑推理培养，引导学生建立严谨的数学思维框架。",
    userId: undefined,
  },
  {
    id: "tutor-yang-2",
    name: "杨老师",
    title: "学业规划导师",
    school: "南方医科大学",
    avatar: "",
    specialties: ["学业规划", "学习方法", "医学素养"],
    bio: "南方医科大学本科，擅长学习方法指导与学业规划，帮助学习者建立科学高效的学习体系。",
    userId: undefined,
  },
];

/** Recruitment card — displayed after tutor profiles */
export const recruitmentCard = {
  title: "导师招募中",
  description:
    "我们正在与深圳大学、香港中文大学（深圳）等高校的优秀教育者建立合作。如果你热爱教育、希望帮助学习者成长，欢迎加入 QIXU 导师团队。",
  ctaLabel: "了解加入方式",
  ctaHref: "/contact",
  /** List of schools we're recruiting from */
  targetSchools: [
    "深圳大学",
    "香港中文大学（深圳）",
    "南方科技大学",
    "哈尔滨工业大学（深圳）",
  ],
} as const;

// ---------------------------------------------------------------------------
// AI Showcase — Mock Workflow Steps
// ---------------------------------------------------------------------------

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: "upload" | "analyze" | "suggestion";
  /** Mock data shown during this step */
  mockContent?: string;
}

export const mockWorkflowSteps: WorkflowStep[] = [
  {
    id: "upload",
    stepNumber: 1,
    title: "上传",
    description: "上传学习资料或描述学习需求",
    icon: "upload",
    mockContent: "支持文档、图片、文字描述等多种输入方式",
  },
  {
    id: "analyze",
    stepNumber: 2,
    title: "分析",
    description: "AI 分析学习状态与知识薄弱点",
    icon: "analyze",
    mockContent: "基于知识图谱定位薄弱环节，生成分析报告",
  },
  {
    id: "suggestion",
    stepNumber: 3,
    title: "建议",
    description: "生成个性化成长建议与学习路径",
    icon: "suggestion",
    mockContent: "结合导师经验，提供可执行的学习改进方案",
  },
];

/** Mock AI analysis result */
export interface MockAssessmentResult {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  updatedAt: string;
}

export function generateMockAssessment(
  grade: string,
  target: string,
  subject?: string
): MockAssessmentResult {
  const base = subject ? `${subject}领域` : "综合";
  return {
    strengths: [
      `${base}基础概念掌握扎实`,
      "学习主动性较强",
    ],
    weaknesses: [
      `${base}知识体系有待系统化`,
      "跨学科综合应用能力可进一步提升",
    ],
    suggestions: [
      `建议从${target || "基础巩固"}入手，逐步建立知识框架`,
      "每周安排2-3次针对性练习",
      "利用 AI 助手进行薄弱环节的智能检测",
    ],
    updatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Hero — Quick Growth Assessment
// ---------------------------------------------------------------------------

export interface AssessmentGrade {
  value: string;
  label: string;
}

export interface AssessmentTarget {
  value: string;
  label: string;
}

export const assessmentGrades: AssessmentGrade[] = [
  { value: "primary", label: "小学" },
  { value: "junior", label: "初中" },
  { value: "senior", label: "高中" },
  { value: "college", label: "大学及以上" },
];

export const assessmentTargets: AssessmentTarget[] = [
  { value: "score", label: "提升成绩" },
  { value: "interest", label: "培养兴趣" },
  { value: "exam", label: "备考冲刺" },
  { value: "career", label: "职业规划" },
  { value: "gaokao_volunteer", label: "高考志愿" },
];

// ---------------------------------------------------------------------------
// Success Stories — Recruitment CTA
// ---------------------------------------------------------------------------

export interface StoriesRecruitment {
  title: string;
  description: string;
  subDescription: string;
  ctaLabel: string;
  ctaHref: string;
  benefits: string[];
}

export const storiesRecruitment: StoriesRecruitment = {
  title: "首批成长故事招募中",
  description:
    "我们正在寻找第一批 QIXU 学习者，免费体验 AI 学习助手与导师陪伴服务，你的成长故事将被真实记录。",
  subDescription:
    "未来这里将展示真实的学习者成长历程，而非虚构的推荐语。",
  ctaLabel: "申请加入",
  ctaHref: "/contact",
  benefits: [
    "免费使用 AI 学习助手",
    "匹配专属真人导师",
    "记录完整成长档案",
    "获得个性化学习报告",
  ],
};
