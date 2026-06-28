/**
 * Knowledge domain — unified repository.
 *
 * Data sources (merged in order of priority):
 *   1. data-real.ts — REAL admission data from official announcements
 *   2. data-expanded.ts — simulated multi-province data
 *   3. repository.ts legacy mock — old simulated data (deprecated)
 *
 * All REAL data clearly labeled via data source metadata.
 */

import type { University, Major, AdmissionRecord, SubjectType } from "./types";
import { expandedUniversities, expandedRecords } from "./data-expanded";
import {
  realUniversities, realAdmissionRecords,
  realHistoryRecords, realCollegeRecords,
  collegeUniversities,
} from "./data-real";

// ---------------------------------------------------------------------------
// Legacy mock Universities (deprecated — use real data instead)
// ---------------------------------------------------------------------------

export const mockUniversities: University[] = [
  // 保留旧ID映射，让之前的引用不报错
  { id: "u-001", name: "深圳大学", province: "广东", city: "深圳", tier: "普通本科", type: "综合", tags: ["特区大学"], website: "https://www.szu.edu.cn", description: "" },
  { id: "u-002", name: "南方科技大学", province: "广东", city: "深圳", tier: "双一流", type: "理工", tags: ["研究型"], website: "https://www.sustech.edu.cn", description: "" },
  { id: "u-003", name: "香港中文大学（深圳）", province: "广东", city: "深圳", tier: "普通本科", type: "综合", tags: ["中外合作"], website: "https://www.cuhk.edu.cn", description: "" },
  { id: "u-004", name: "中山大学", province: "广东", city: "广州", tier: "985", type: "综合", tags: ["华南第一学府"], website: "https://www.sysu.edu.cn", description: "" },
  { id: "u-005", name: "华南理工大学", province: "广东", city: "广州", tier: "985", type: "理工", tags: ["建筑老八校"], website: "https://www.scut.edu.cn", description: "" },
  { id: "u-006", name: "暨南大学", province: "广东", city: "广州", tier: "211", type: "综合", tags: ["华侨最高学府"], website: "https://www.jnu.edu.cn", description: "" },
  { id: "u-007", name: "华南师范大学", province: "广东", city: "广州", tier: "211", type: "师范", tags: ["教师摇篮"], website: "https://www.scnu.edu.cn", description: "" },
  { id: "u-008", name: "南方医科大学", province: "广东", city: "广州", tier: "普通本科", type: "医药", tags: ["医学强校"], website: "https://www.smu.edu.cn", description: "" },
  { id: "u-009", name: "广东工业大学", province: "广东", city: "广州", tier: "普通本科", type: "理工", tags: ["工科强校"], website: "https://www.gdut.edu.cn", description: "" },
  { id: "u-010", name: "深圳技术大学", province: "广东", city: "深圳", tier: "普通本科", type: "理工", tags: ["应用技术"], website: "https://www.sztu.edu.cn", description: "" },
];

export const mockMajors: Major[] = [
  { id: "m-001", name: "计算机科学与技术", category: "工学", employmentDirection: ["互联网企业","金融科技","AI研发"], graduateDirection: ["计算机科学与技术"], popularity: 10 },
  { id: "m-002", name: "软件工程", category: "工学", employmentDirection: ["互联网企业","SaaS","游戏开发"], graduateDirection: ["软件工程"], popularity: 9 },
  { id: "m-003", name: "人工智能", category: "工学", employmentDirection: ["AI企业","自动驾驶","研究院所"], graduateDirection: ["人工智能"], popularity: 10 },
  { id: "m-004", name: "数据科学与大数据技术", category: "工学", employmentDirection: ["数据分析","金融风控"], graduateDirection: ["数据科学"], popularity: 9 },
  { id: "m-005", name: "电子信息工程", category: "工学", employmentDirection: ["通信","芯片设计","物联网"], graduateDirection: ["电子科学与技术"], popularity: 8 },
  { id: "m-006", name: "临床医学", category: "医学", employmentDirection: ["医院","医疗科研"], graduateDirection: ["临床医学"], popularity: 8 },
  { id: "m-007", name: "金融学", category: "经济学", employmentDirection: ["银行","证券","基金"], graduateDirection: ["金融学"], popularity: 9 },
  { id: "m-008", name: "会计学", category: "管理学", employmentDirection: ["会计师事务所","企业财务"], graduateDirection: ["会计学"], popularity: 7 },
  { id: "m-009", name: "法学", category: "法学", employmentDirection: ["律所","企业法务"], graduateDirection: ["法学"], popularity: 7 },
  { id: "m-010", name: "英语", category: "文学", employmentDirection: ["翻译","外贸"], graduateDirection: ["外国语言文学"], popularity: 6 },
  { id: "m-011", name: "数学与应用数学", category: "理学", employmentDirection: ["教育","金融数学"], graduateDirection: ["数学"], popularity: 6 },
  { id: "m-012", name: "应用心理学", category: "教育学", employmentDirection: ["心理咨询","人力资源"], graduateDirection: ["心理学"], popularity: 7 },
  { id: "m-013", name: "建筑学", category: "工学", employmentDirection: ["建筑设计","房地产"], graduateDirection: ["建筑学"], popularity: 7 },
  { id: "m-014", name: "生物医学工程", category: "工学", employmentDirection: ["医疗器械","制药"], graduateDirection: ["生物医学工程"], popularity: 6 },
  { id: "m-015", name: "工商管理", category: "管理学", employmentDirection: ["企业管理","咨询"], graduateDirection: ["工商管理"], popularity: 7 },
];

export const mockAdmissionRecords: AdmissionRecord[] = [];

// ---------------------------------------------------------------------------
// Repository access functions
// ---------------------------------------------------------------------------

export function getAllUniversities(): University[] {
  return [...realUniversities, ...collegeUniversities, ...expandedUniversities, ...mockUniversities];
}

export function getUniversityById(id: string): University | undefined {
  return getAllUniversities().find((u) => u.id === id);
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
  // Merge all data: real (highest priority) + expanded + legacy mock
  let records: AdmissionRecord[] = [
    ...realAdmissionRecords,
    ...realHistoryRecords,
    ...realCollegeRecords,
    ...expandedRecords,
    ...mockAdmissionRecords,
  ];

  if (filters?.province) records = records.filter((r) => r.province === filters.province);
  if (filters?.subjectType) records = records.filter((r) => r.subjectType === filters.subjectType);
  if (filters?.year) records = records.filter((r) => r.year === filters.year);
  if (filters?.universityId) records = records.filter((r) => r.universityId === filters.universityId);
  if (filters?.majorId) records = records.filter((r) => r.majorId === filters.majorId);
  return records;
}
