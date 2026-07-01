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

/** Provinces that have REAL (official) admission data */
export const REAL_DATA_PROVINCES: string[] = ["广东"];

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

/**
 * Check if score and rank are roughly consistent for a given province.
 * Returns null if consistent, or a warning message if the combination
 * looks implausible (e.g. 700 score with 200,000 rank).
 *
 * Based on known score-rank distributions from real admission data.
 */
export function checkScoreRankConsistency(
  province: string,
  score: number,
  rank: number,
  subjectType?: string,
): string | null {
  // Approximate rank ranges per score band for Guangdong province
  if (province === "广东") {
    // 物理类 rank ranges (Guangdong 2025 official distribution)
    const physicsRanges = [
      { minScore: 660, maxRank: 2500 },
      { minScore: 640, maxRank: 6000 },
      { minScore: 620, maxRank: 14000 },
      { minScore: 600, maxRank: 26000 },
      { minScore: 580, maxRank: 42000 },
      { minScore: 560, maxRank: 65000 },
      { minScore: 540, maxRank: 90000 },
      { minScore: 520, maxRank: 125000 },
      { minScore: 500, maxRank: 160000 },
      { minScore: 480, maxRank: 200000 },
      { minScore: 460, maxRank: 240000 },
      { minScore: 440, maxRank: 290000 },
      { minScore: 420, maxRank: 330000 },
    ];
    // 历史类 rank ranges (Guangdong 2025 approximate)
    const historyRanges = [
      { minScore: 640, maxRank: 800 },
      { minScore: 620, maxRank: 2000 },
      { minScore: 600, maxRank: 5000 },
      { minScore: 580, maxRank: 10000 },
      { minScore: 560, maxRank: 18000 },
      { minScore: 540, maxRank: 30000 },
      { minScore: 520, maxRank: 45000 },
      { minScore: 500, maxRank: 60000 },
      { minScore: 480, maxRank: 80000 },
      { minScore: 460, maxRank: 95000 },
      { minScore: 440, maxRank: 110000 },
      { minScore: 420, maxRank: 125000 },
    ];

    const ranges = subjectType === "历史类" ? historyRanges : physicsRanges;
    const defaultMaxRank = subjectType === "历史类" ? 150000 : 400000;

    // Find the appropriate range and check
    let expectedMaxRank = defaultMaxRank;
    for (const r of ranges) {
      if (score >= r.minScore) { expectedMaxRank = r.maxRank; break; }
    }
    if (rank > expectedMaxRank * 1.5) {
      return `分数 ${score} 通常对应位次 ≤${expectedMaxRank.toLocaleString()}，你输入的位次 ${rank.toLocaleString()} 偏大，请确认是否正确`;
    }
    if (score >= 600 && rank > (subjectType === "历史类" ? 20000 : 80000)) {
      return `高分段（${score}分）通常位次不会这么靠后，请检查分数或位次是否填反了`;
    }
    if (score <= 450 && rank < (subjectType === "历史类" ? 5000 : 30000)) {
      return `低分段（${score}分）通常位次不会这么靠前，请检查分数或位次是否填反了`;
    }
  }

  // Generic check for other provinces (750-score system)
  const maxScore = getScoreRange(province).max;
  if (score > maxScore * 0.85 && rank > 100000) {
    return `高分段通常位次不会这么靠后，请确认位次是否正确`;
  }
  if (score < maxScore * 0.55 && rank < 10000) {
    return `低分段通常位次不会这么靠前，请确认分数是否正确`;
  }

  return null;
}
