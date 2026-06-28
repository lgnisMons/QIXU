/**
 * Knowledge domain — mock repository.
 *
 * All data is mocked for development purposes.
 * Replace with real database queries (Supabase) in Sprint-011+.
 */

import type { University, Major, AdmissionRecord, SubjectType } from "./types";

// ---------------------------------------------------------------------------
// Mock Universities (10)
// ---------------------------------------------------------------------------

export const mockUniversities: University[] = [
  {
    id: "u-001", name: "深圳大学", province: "广东", city: "深圳",
    tier: "普通本科", type: "综合",
    tags: ["特区大学", "窗口大学", "实验大学", "创新创业"],
    website: "https://www.szu.edu.cn",
    description: "深圳大学1983年经教育部批准设立，北大援建中文外语，清华援建电子建筑，人大援建经济法律。",
  },
  {
    id: "u-002", name: "南方科技大学", province: "广东", city: "深圳",
    tier: "双一流", type: "理工",
    tags: ["研究型", "国际化", "小班制", "书院制"],
    website: "https://www.sustech.edu.cn",
    description: "南方科技大学是深圳在中国高等教育改革发展的时代背景下创建的一所高起点、高定位的研究型大学。",
  },
  {
    id: "u-003", name: "香港中文大学（深圳）", province: "广东", city: "深圳",
    tier: "普通本科", type: "综合",
    tags: ["中外合作", "全英教学", "书院制", "国际视野"],
    website: "https://www.cuhk.edu.cn",
    description: "香港中文大学（深圳）传承香港中文大学的办学理念和学术体系，致力于培养具有国际视野的创新型人才。",
  },
  {
    id: "u-004", name: "中山大学", province: "广东", city: "广州",
    tier: "985", type: "综合",
    tags: ["华南第一学府", "百年名校", "文理医工", "ESI前1%"],
    website: "https://www.sysu.edu.cn",
    description: "中山大学由孙中山先生创办，是国家985工程、211工程重点建设高校，位列双一流A类。",
  },
  {
    id: "u-005", name: "华南理工大学", province: "广东", city: "广州",
    tier: "985", type: "理工",
    tags: ["建筑老八校", "工程师摇篮", "轻工食品", "AI强校"],
    website: "https://www.scut.edu.cn",
    description: "华南理工大学是直属教育部的全国重点大学，建筑老八校之一，以工见长、理工结合。",
  },
  {
    id: "u-006", name: "暨南大学", province: "广东", city: "广州",
    tier: "211", type: "综合",
    tags: ["华侨最高学府", "新闻传播", "药学", "商科"],
    website: "https://www.jnu.edu.cn",
    description: "暨南大学是中国第一所由政府创办的华侨学府，素有「华侨最高学府」之称。",
  },
  {
    id: "u-007", name: "华南师范大学", province: "广东", city: "广州",
    tier: "211", type: "师范",
    tags: ["南方教师摇篮", "心理学", "教育学", "光学"],
    website: "https://www.scnu.edu.cn",
    description: "华南师范大学是国家211工程重点大学，广东省高水平大学整体建设高校。",
  },
  {
    id: "u-008", name: "南方医科大学", province: "广东", city: "广州",
    tier: "普通本科", type: "医药",
    tags: ["医学强校", "临床医学", "公共卫生", "中医"],
    website: "https://www.smu.edu.cn",
    description: "南方医科大学前身为第一军医大学，是全国首批开设八年制临床医学专业的高校之一。",
  },
  {
    id: "u-009", name: "广东工业大学", province: "广东", city: "广州",
    tier: "普通本科", type: "理工",
    tags: ["工科强校", "自动化", "机械", "计算机"],
    website: "https://www.gdut.edu.cn",
    description: "广东工业大学是广东省高水平理工科大学，工程学进入ESI全球前1‰。",
  },
  {
    id: "u-010", name: "深圳技术大学", province: "广东", city: "深圳",
    tier: "普通本科", type: "理工",
    tags: ["应用技术", "产教融合", "德国模式", "新兴产业"],
    website: "https://www.sztu.edu.cn",
    description: "深圳技术大学借鉴德国应用技术大学经验，致力于培养高层次应用技术人才。",
  },
];

// ---------------------------------------------------------------------------
// Mock Majors (15)
// ---------------------------------------------------------------------------

export const mockMajors: Major[] = [
  {
    id: "m-001", name: "计算机科学与技术", category: "工学",
    employmentDirection: ["互联网企业", "金融科技", "AI 研发", "软件开发"],
    graduateDirection: ["计算机科学与技术", "软件工程", "人工智能"],
    popularity: 10,
  },
  {
    id: "m-002", name: "软件工程", category: "工学",
    employmentDirection: ["互联网企业", "SaaS 企业", "游戏开发", "系统集成"],
    graduateDirection: ["软件工程", "计算机科学与技术"],
    popularity: 9,
  },
  {
    id: "m-003", name: "人工智能", category: "工学",
    employmentDirection: ["AI 企业", "自动驾驶", "智能制造", "研究院所"],
    graduateDirection: ["人工智能", "计算机科学与技术", "模式识别"],
    popularity: 10,
  },
  {
    id: "m-004", name: "数据科学与大数据技术", category: "工学",
    employmentDirection: ["数据分析", "金融风控", "商业智能", "政府数据"],
    graduateDirection: ["数据科学", "统计学", "计算机科学"],
    popularity: 9,
  },
  {
    id: "m-005", name: "电子信息工程", category: "工学",
    employmentDirection: ["通信企业", "芯片设计", "消费电子", "物联网"],
    graduateDirection: ["电子科学与技术", "信息与通信工程"],
    popularity: 8,
  },
  {
    id: "m-006", name: "临床医学", category: "医学",
    employmentDirection: ["医院", "医疗科研", "公共卫生", "医药企业"],
    graduateDirection: ["临床医学", "基础医学", "公共卫生"],
    popularity: 8,
  },
  {
    id: "m-007", name: "金融学", category: "经济学",
    employmentDirection: ["银行", "证券", "基金", "保险", "咨询"],
    graduateDirection: ["金融学", "经济学", "工商管理"],
    popularity: 9,
  },
  {
    id: "m-008", name: "会计学", category: "管理学",
    employmentDirection: ["会计师事务所", "企业财务", "审计", "税务"],
    graduateDirection: ["会计学", "工商管理", "审计"],
    popularity: 7,
  },
  {
    id: "m-009", name: "法学", category: "法学",
    employmentDirection: ["律所", "企业法务", "政府法制", "知识产权"],
    graduateDirection: ["法学", "法律硕士"],
    popularity: 7,
  },
  {
    id: "m-010", name: "英语", category: "文学",
    employmentDirection: ["翻译", "外贸", "国际教育", "跨境电商"],
    graduateDirection: ["外国语言文学", "翻译硕士", "比较文学"],
    popularity: 6,
  },
  {
    id: "m-011", name: "数学与应用数学", category: "理学",
    employmentDirection: ["教育", "金融数学", "数据分析", "科研"],
    graduateDirection: ["数学", "统计学", "计算机科学"],
    popularity: 6,
  },
  {
    id: "m-012", name: "应用心理学", category: "教育学",
    employmentDirection: ["心理咨询", "人力资源", "用户体验", "教育"],
    graduateDirection: ["心理学", "教育学", "认知科学"],
    popularity: 7,
  },
  {
    id: "m-013", name: "建筑学", category: "工学",
    employmentDirection: ["建筑设计院", "房地产", "城市规划", "室内设计"],
    graduateDirection: ["建筑学", "城乡规划学", "风景园林学"],
    popularity: 7,
  },
  {
    id: "m-014", name: "生物医学工程", category: "工学",
    employmentDirection: ["医疗器械", "制药企业", "科研机构", "医院设备"],
    graduateDirection: ["生物医学工程", "电子科学与技术", "材料科学"],
    popularity: 6,
  },
  {
    id: "m-015", name: "工商管理", category: "管理学",
    employmentDirection: ["企业管理", "咨询", "市场营销", "创业"],
    graduateDirection: ["工商管理(MBA)", "企业管理", "市场营销"],
    popularity: 7,
  },
];

// ---------------------------------------------------------------------------
// Mock Admission Records (≈ 40, 2025 data simulated)
// ---------------------------------------------------------------------------

export const mockAdmissionRecords: AdmissionRecord[] = [
  // ---- 深圳大学 ----
  { id: "ar-001", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-001", majorId: "m-001", lowestScore: 610, lowestRank: 18500, quota: 120, tuition: 6850 },
  { id: "ar-002", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-001", majorId: "m-002", lowestScore: 612, lowestRank: 17800, quota: 100, tuition: 6850 },
  { id: "ar-003", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-001", majorId: "m-005", lowestScore: 600, lowestRank: 21500, quota: 80, tuition: 6850 },
  { id: "ar-004", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-001", majorId: "m-003", lowestScore: 615, lowestRank: 16500, quota: 60, tuition: 6850 },
  { id: "ar-005", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-001", majorId: "m-007", lowestScore: 585, lowestRank: 8200, quota: 40, tuition: 6850 },
  { id: "ar-006", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-001", majorId: "m-009", lowestScore: 588, lowestRank: 7500, quota: 50, tuition: 6850 },

  // ---- 南方科技大学 ----
  { id: "ar-007", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-002", majorId: "m-001", lowestScore: 645, lowestRank: 5200, quota: 45, tuition: 6850 },
  { id: "ar-008", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-002", majorId: "m-004", lowestScore: 642, lowestRank: 5800, quota: 30, tuition: 6850 },
  { id: "ar-009", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-002", majorId: "m-003", lowestScore: 648, lowestRank: 4500, quota: 35, tuition: 6850 },

  // ---- 香港中文大学（深圳）----
  { id: "ar-010", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-003", majorId: "m-001", lowestScore: 635, lowestRank: 7200, quota: 50, tuition: 115000 },
  { id: "ar-011", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-003", majorId: "m-004", lowestScore: 630, lowestRank: 8500, quota: 40, tuition: 115000 },
  { id: "ar-012", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-003", majorId: "m-007", lowestScore: 605, lowestRank: 3800, quota: 30, tuition: 115000 },

  // ---- 中山大学 ----
  { id: "ar-013", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-004", majorId: "m-001", lowestScore: 660, lowestRank: 2200, quota: 90, tuition: 6850 },
  { id: "ar-014", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-004", majorId: "m-006", lowestScore: 665, lowestRank: 1500, quota: 100, tuition: 7650 },
  { id: "ar-015", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-004", majorId: "m-003", lowestScore: 668, lowestRank: 1100, quota: 40, tuition: 6850 },
  { id: "ar-016", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-004", majorId: "m-009", lowestScore: 620, lowestRank: 1800, quota: 60, tuition: 6850 },
  { id: "ar-017", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-004", majorId: "m-007", lowestScore: 625, lowestRank: 1400, quota: 50, tuition: 6850 },

  // ---- 华南理工大学 ----
  { id: "ar-018", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-005", majorId: "m-001", lowestScore: 648, lowestRank: 4500, quota: 100, tuition: 6850 },
  { id: "ar-019", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-005", majorId: "m-002", lowestScore: 645, lowestRank: 5200, quota: 80, tuition: 6850 },
  { id: "ar-020", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-005", majorId: "m-013", lowestScore: 640, lowestRank: 6100, quota: 50, tuition: 7650 },

  // ---- 暨南大学 ----
  { id: "ar-021", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-006", majorId: "m-001", lowestScore: 618, lowestRank: 15500, quota: 70, tuition: 6850 },
  { id: "ar-022", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-006", majorId: "m-005", lowestScore: 612, lowestRank: 17800, quota: 55, tuition: 6850 },
  { id: "ar-023", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-006", majorId: "m-010", lowestScore: 598, lowestRank: 4800, quota: 40, tuition: 6850 },
  { id: "ar-024", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-006", majorId: "m-007", lowestScore: 600, lowestRank: 4200, quota: 35, tuition: 6850 },

  // ---- 华南师范大学 ----
  { id: "ar-025", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-007", majorId: "m-011", lowestScore: 595, lowestRank: 23500, quota: 60, tuition: 6850 },
  { id: "ar-026", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-007", majorId: "m-001", lowestScore: 602, lowestRank: 20500, quota: 80, tuition: 6850 },
  { id: "ar-027", year: 2025, province: "广东", subjectType: "历史类", universityId: "u-007", majorId: "m-012", lowestScore: 580, lowestRank: 9000, quota: 45, tuition: 6850 },

  // ---- 南方医科大学 ----
  { id: "ar-028", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-008", majorId: "m-006", lowestScore: 615, lowestRank: 16500, quota: 120, tuition: 7650 },
  { id: "ar-029", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-008", majorId: "m-014", lowestScore: 605, lowestRank: 19500, quota: 60, tuition: 7650 },

  // ---- 广东工业大学 ----
  { id: "ar-030", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-009", majorId: "m-001", lowestScore: 575, lowestRank: 36000, quota: 150, tuition: 6850 },
  { id: "ar-031", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-009", majorId: "m-002", lowestScore: 572, lowestRank: 38000, quota: 120, tuition: 6850 },
  { id: "ar-032", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-009", majorId: "m-005", lowestScore: 568, lowestRank: 41000, quota: 100, tuition: 6850 },

  // ---- 深圳技术大学 ----
  { id: "ar-033", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-010", majorId: "m-001", lowestScore: 555, lowestRank: 52000, quota: 80, tuition: 6850 },
  { id: "ar-034", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-010", majorId: "m-005", lowestScore: 548, lowestRank: 57000, quota: 60, tuition: 6850 },
  { id: "ar-035", year: 2025, province: "广东", subjectType: "物理类", universityId: "u-010", majorId: "m-004", lowestScore: 550, lowestRank: 55000, quota: 40, tuition: 6850 },
];

// ---------------------------------------------------------------------------
// Repository access functions (future: Supabase)
// ---------------------------------------------------------------------------

export function getAllUniversities(): University[] {
  return mockUniversities;
}

export function getUniversityById(id: string): University | undefined {
  return mockUniversities.find((u) => u.id === id);
}

export function getAllMajors(): Major[] {
  return mockMajors;
}

export function getMajorById(id: string): Major | undefined {
  return mockMajors.find((m) => m.id === id);
}

export function getAdmissionRecords(filters?: {
  province?: string;
  year?: number;
  subjectType?: SubjectType;
  universityId?: string;
  majorId?: string;
}): AdmissionRecord[] {
  let records = mockAdmissionRecords;
  if (filters?.province) records = records.filter((r) => r.province === filters.province);
  if (filters?.year) records = records.filter((r) => r.year === filters.year);
  if (filters?.subjectType) records = records.filter((r) => r.subjectType === filters.subjectType);
  if (filters?.universityId) records = records.filter((r) => r.universityId === filters.universityId);
  if (filters?.majorId) records = records.filter((r) => r.majorId === filters.majorId);
  return records;
}
