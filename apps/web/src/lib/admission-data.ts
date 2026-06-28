/**
 * Admission domain-driven UI data.
 *
 * All UI-selectable lists (provinces, cities, majors, careers, budgets)
 * are derived from the domain layer — never hardcoded in components.
 *
 * This file re-exports and organizes domain data for form consumption.
 */

import {
  getAllUniversities, getAllMajors,
  type MajorCategory, type SubjectType,
} from "@qixu/domain";

// ---- Provinces (derived from university data, sorted) ----

/** All provinces that have university data */
export const ADMISSION_PROVINCES: string[] = [
  ...new Set(getAllUniversities().map((u) => u.province)),
].sort();

// ---- All 31 provinces for result page filter ----

export const ALL_PROVINCES: string[] = [
  "广东","北京","上海","浙江","江苏","四川","湖北","湖南",
  "山东","河南","福建","安徽","陕西","重庆","辽宁","吉林",
  "黑龙江","江西","河北","山西","广西","海南","贵州","云南",
  "甘肃","天津","宁夏","新疆","内蒙古","青海","西藏",
];

// ---- Major Categories ----

export const MAJOR_CATEGORY_OPTIONS: { value: MajorCategory; label: string }[] = [
  { value: "工学", label: "工学" },
  { value: "理学", label: "理学" },
  { value: "医学", label: "医学" },
  { value: "文学", label: "文学" },
  { value: "经济学", label: "经济学" },
  { value: "管理学", label: "管理学" },
  { value: "法学", label: "法学" },
  { value: "教育学", label: "教育学" },
  { value: "艺术学", label: "艺术学" },
  { value: "农学", label: "农学" },
];

// ---- Career Options (from major employment directions) ----

export const CAREER_OPTIONS: string[] = [
  ...new Set(
    getAllMajors().flatMap((m) => m.employmentDirection)
  ),
].sort();

// ---- Subject Types ----

export const SUBJECT_TYPES: SubjectType[] = ["物理类", "历史类"];

// ---- Budget Options ----

export const BUDGET_OPTIONS = [
  { value: 10000, label: "1万/年以下" },
  { value: 30000, label: "1-3万/年" },
  { value: 60000, label: "3-6万/年" },
  { value: 120000, label: "6-12万/年" },
  { value: 200000, label: "12万以上/年" },
];

// ---- Score range by province scoring system ----

/** Default Gaokao score range. Some provinces differ. */
export const SCORE_RANGE: Record<string, { min: number; max: number }> = {
  "广东": { min: 300, max: 750 },
  "北京": { min: 300, max: 750 },
  "浙江": { min: 300, max: 750 },
  "湖北": { min: 300, max: 750 },
  "江苏": { min: 300, max: 750 },
  "四川": { min: 300, max: 750 },
  "湖南": { min: 300, max: 750 },
  "山东": { min: 300, max: 750 },
  "河南": { min: 300, max: 750 },
  "福建": { min: 300, max: 750 },
  "上海": { min: 300, max: 660 },
  "海南": { min: 300, max: 900 },
};

export function getScoreRange(province: string): { min: number; max: number } {
  return SCORE_RANGE[province] ?? { min: 300, max: 750 };
}
