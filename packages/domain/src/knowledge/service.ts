/**
 * Knowledge domain — recommendation rule engine (mock).
 *
 * 7 rule categories: Reach, Match, Safe, Budget, Major, Employment, Risk.
 * Tier boundaries (clean partition, no overlap):
 *   Reach: rankRatio 0.70 — 1.00 (student at or below cutoff)
 *   Match: rankRatio 1.00 — 1.50 (student above cutoff)
 *   Safe:  rankRatio 1.50+          (student well above cutoff)
 *
 * No AI/LLM — pure rule-based scoring. Extensible for future ML models.
 *
 * Province filtering is handled in the UI layer (result page filter),
 * not in the engine — the engine searches all available data.
 */

import { generateId } from "../utils";
import type {
  StudentProfile, University, Major, AdmissionRecord,
  RuleResult, RuleCategory, AdmissionRecommendation,
  AdmissionRecommendationOutput,
} from "./types";
import {
  getAllUniversities, getAllMajors, getAdmissionRecords,
} from "./repository";

// ---------------------------------------------------------------------------
// Rule weight configuration — single place to tune the engine
// ---------------------------------------------------------------------------

const RULE_WEIGHTS: Record<string, number> = {
  reach: 0.18,
  match: 0.22,
  safe: 0.12,
  budget: 0.15,
  major: 0.15,
  employment: 0.06,
  risk: 0.12,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findRule(rules: RuleResult[], category: RuleCategory): RuleResult {
  return rules.find((r) => r.category === category) ?? {
    category,
    score: 0,
    label: "",
    detail: "规则未执行",
    passed: false,
  };
}

// ---------------------------------------------------------------------------
// Rule Engine
// ---------------------------------------------------------------------------

export function runRecommendationEngine(
  student: StudentProfile,
  options?: {
    maxRecommendations?: number;
    year?: number;
    subjectType?: "物理类" | "历史类";
    provinceFilter?: string[];
  }
): AdmissionRecommendationOutput {
  const year = options?.year ?? 2025;
  const subjectType = options?.subjectType ?? student.subjectType;
  const max = options?.maxRecommendations ?? 15;
  const provinceFilter = options?.provinceFilter;

  // Query ALL provinces — province filtering is a UI concern
  let records = getAdmissionRecords({ year, subjectType });
  const universities = getAllUniversities();
  const majors = getAllMajors();

  const scored: AdmissionRecommendation[] = [];

  for (const record of records) {
    const university = universities.find((u) => u.id === record.universityId);
    const major = majors.find((m) => m.id === record.majorId);
    if (!university || !major) continue;

    const rules = evaluateAllRules(student, record, university, major);
    const composite = computeComposite(rules);
    const tier = classifyTier(rules);

    scored.push({
      id: generateId("rec"),
      studentId: "student_001",
      universityId: university.id,
      majorId: major.id,
      universityName: university.name,
      universityCity: university.city,
      universityProvince: university.province,
      majorName: major.name,
      tuition: record.tuition,
      tier,
      compositeScore: composite,
      rules,
      breakdown: buildBreakdown(student, record, university, major, rules),
    });
  }

  scored.sort((a, b) => b.compositeScore - a.compositeScore);

  // Apply province filter if specified (UI-level filtering)
  let filtered = scored;
  if (provinceFilter && provinceFilter.length > 0) {
    filtered = scored.filter((r) => provinceFilter.includes(r.universityProvince));
  }

  filtered.sort((a, b) => b.compositeScore - a.compositeScore);
  const top = filtered.slice(0, max);
  const summary = buildSummary(top, student);

  return {
    student,
    recommendations: top,
    summary,
    generatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Rule Evaluators
// ---------------------------------------------------------------------------

function evaluateAllRules(
  student: StudentProfile,
  record: AdmissionRecord,
  university: University,
  major: Major
): RuleResult[] {
  return [
    evaluateReach(student, record),
    evaluateMatch(student, record),
    evaluateSafe(student, record),
    evaluateBudget(student, record),
    evaluateMajor(student, major),
    evaluateEmployment(student, major),
    evaluateRisk(student, record),
  ];
}

/** Reach (冲): student rank close to cutoff (0.70–1.00) */
function evaluateReach(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 0.90 && rankRatio <= 1.00) {
    score = 0.9;
    detail = `位次(${student.rank})非常接近录取位次(${record.lowestRank})，可以冲刺`;
  } else if (rankRatio >= 0.80 && rankRatio < 0.90) {
    score = 0.6;
    detail = `位次略低于录取线，仍有一定冲刺空间`;
  } else if (rankRatio > 1.00 && rankRatio <= 1.15) {
    score = 0.55;
    detail = `位次略超录取线，冲刺把握较大`;
  } else if (rankRatio >= 0.70 && rankRatio < 0.80) {
    score = 0.3;
    detail = `差距明显，冲刺难度较高`;
  } else {
    score = 0.1;
    detail = `差距过大，不建议作为冲刺目标`;
  }
  return { category: "reach", score, label: "冲刺", detail, passed: score >= 0.4 };
}

/** Match (稳): student above cutoff (1.00–1.50) */
function evaluateMatch(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 1.10 && rankRatio <= 1.50) {
    score = 0.95;
    detail = `位次(${student.rank})在录取范围之内，录取可能性大`;
  } else if (rankRatio > 1.50 && rankRatio <= 2.00) {
    score = 0.85;
    detail = `位次稳超录取线，录取把握很大`;
  } else if (rankRatio >= 1.00 && rankRatio < 1.10) {
    score = 0.65;
    detail = `位次刚好越过录取线，有较大把握`;
  } else {
    score = 0.15;
    detail = `差距较大，不属于稳妥选择`;
  }
  return { category: "match", score, label: "稳妥", detail, passed: score >= 0.6 };
}

/** Safe (保): student well above cutoff (1.50+) */
function evaluateSafe(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 2.00) {
    score = 1.0;
    detail = `位次远超录取线，录取几乎确定`;
  } else if (rankRatio >= 1.50) {
    score = 0.9;
    detail = `位次明显高于录取线，保底安全`;
  } else {
    score = 0.1;
    detail = `不适合作为保底选择`;
  }
  return { category: "safe", score, label: "保底", detail, passed: score >= 0.6 };
}

/** Budget: tuition + estimated living cost vs student budget */
function evaluateBudget(student: StudentProfile, record: AdmissionRecord): RuleResult {
  // cooperative programs are ~2× regular tuition, so effective cost is higher
  const costMultiplier = student.cooperativeProgramAccepted ? 1.0 : 1.0;
  const effectiveCost = record.tuition * costMultiplier;
  const ratio = student.budget / Math.max(effectiveCost, 1);

  let score: number;
  let detail: string;
  // low-income family → stricter budget check
  const strictness = student.familyFinancialLevel === "low" ? 1.2 : 1.0;

  if (ratio >= 2 * strictness) {
    score = 1.0;
    detail = `学费¥${formatK(record.tuition)}/年在预算内，负担轻松`;
  } else if (ratio >= 1.0 * strictness) {
    score = 0.8;
    detail = `学费在预算范围内`;
  } else if (ratio >= 0.8) {
    score = 0.4;
    detail = `学费略超预算，需考虑经济因素`;
  } else {
    score = 0.1;
    detail = `学费超出预算较多`;
  }
  return { category: "budget", score, label: "预算", detail, passed: ratio >= 1.0 };
}

/** Major: category preference match */
function evaluateMajor(student: StudentProfile, major: Major): RuleResult {
  const prefMatch = student.majorPreference.length === 0 ||
    student.majorPreference.includes(major.category);
  let score: number;
  let detail: string;
  if (prefMatch && student.majorPreference.length > 0) {
    score = 1.0;
    detail = `「${major.name}」(${major.category})符合你的专业偏好`;
  } else if (student.majorPreference.length === 0) {
    score = 0.6;
    detail = `未设置专业偏好，「${major.name}」可作为选项`;
  } else {
    score = 0.15;
    detail = `「${major.name}」(${major.category})不在你的偏好中`;
  }
  return { category: "major", score, label: "专业", detail, passed: prefMatch };
}

/** Employment: career direction alignment */
function evaluateEmployment(student: StudentProfile, major: Major): RuleResult {
  const hasPref = student.careerPreference.length > 0;
  const overlap = hasPref
    ? major.employmentDirection.filter((d) =>
      student.careerPreference.some((c) => d.includes(c) || c.includes(d))
    ).length
    : 0;

  let score: number;
  let detail: string;
  if (overlap >= 2) {
    score = 1.0;
    detail = `就业方向(${major.employmentDirection.slice(0, 3).join("、")})与你的偏好高度匹配`;
  } else if (overlap >= 1) {
    score = 0.7;
    detail = `就业方向部分匹配你的职业偏好`;
  } else if (!hasPref) {
    score = 0.5;
    detail = `未设置职业偏好，参考：${major.employmentDirection.slice(0, 2).join("、")}`;
  } else {
    score = 0.3;
    detail = `就业方向匹配度较低，可进一步了解`;
  }
  return { category: "employment", score, label: "就业", detail, passed: score >= 0.5 };
}

/** Risk: comprehensive admission risk */
function evaluateRisk(
  student: StudentProfile,
  record: AdmissionRecord,
): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  const budgetOk = student.budget >= record.tuition;

  const riskFactors: string[] = [];
  if (rankRatio < 1.0) riskFactors.push("位次低于往年录取线");
  if (!budgetOk) riskFactors.push("学费超出预算");
  if (student.cooperativeProgramAccepted && record.tuition > 100000) {
    riskFactors.push("中外合作项目学费较高");
  }

  let riskLevel: "low" | "medium" | "high";
  let score: number;
  let detail: string;

  if (riskFactors.length === 0) {
    riskLevel = "low";
    score = 0.9;
    detail = "综合风险较低";
  } else if (riskFactors.length === 1) {
    riskLevel = "medium";
    score = 0.55;
    detail = `存在风险：${riskFactors.join("；")}`;
  } else {
    riskLevel = "high";
    score = 0.2;
    detail = `多重风险：${riskFactors.join("；")}`;
  }

  return { category: "risk", score, label: "风险", detail, passed: riskLevel !== "high" };
}

// ---------------------------------------------------------------------------
// Composite Scoring & Tier Classification
// ---------------------------------------------------------------------------

function computeComposite(rules: RuleResult[]): number {
  const weighted = rules.reduce((sum, r) =>
    sum + r.score * (RULE_WEIGHTS[r.category] ?? 0.1), 0);
  return Math.round(weighted * 100);
}

/** Clean tier classification — no overlap */
function classifyTier(rules: RuleResult[]): "reach" | "match" | "safe" {
  const safeRule = findRule(rules, "safe");
  const matchRule = findRule(rules, "match");
  if (safeRule.passed) return "safe";
  if (matchRule.passed) return "match";
  return "reach";
}

function buildBreakdown(
  student: StudentProfile,
  record: AdmissionRecord,
  _university: University,
  _major: Major,
  rules: RuleResult[]
): AdmissionRecommendation["breakdown"] {
  const matchRule = findRule(rules, "match");
  const budgetRule = findRule(rules, "budget");
  const majorRule = findRule(rules, "major");
  const employmentRule = findRule(rules, "employment");
  const riskRule = findRule(rules, "risk");

  return {
    scoreGap: student.score - record.lowestScore,
    rankGap: record.lowestRank - student.rank,
    budgetFit: budgetRule.passed,
    majorMatch: majorRule.passed,
    employmentScore: Math.round(employmentRule.score * 10),
    riskLevel: riskRule.passed ? "low" : riskRule.score >= 0.4 ? "medium" : "high",
  };
}

function buildSummary(
  recommendations: AdmissionRecommendation[],
  student: StudentProfile,
): string {
  const reach = recommendations.filter((r) => r.tier === "reach").length;
  const match = recommendations.filter((r) => r.tier === "match").length;
  const safe = recommendations.filter((r) => r.tier === "safe").length;

  // Count unique provinces
  const provinces = [...new Set(recommendations.map((r) => r.universityProvince))];

  const parts = [
    `基于你的${student.score}分(位次${student.rank.toLocaleString()}，${student.subjectType}，${student.province})`,
    `${recommendations.length === 0 ? "暂无" : `覆盖${provinces.length}省·共${recommendations.length}条`}推荐：`,
    `${safe}保底 · ${match}稳妥 · ${reach}冲刺。`,
    student.majorPreference.length > 0 ? `专业偏好：${student.majorPreference.join("、")}` : "",
    recommendations.length === 0
      ? `当前数据暂不支持你的${student.subjectType}组合，正在努力扩展中。`
      : "可在结果页按省份筛选。建议结合兴趣与职业规划综合考虑。",
  ];
  return parts.filter(Boolean).join("");
}

function formatK(n: number): string {
  return n >= 10000 ? `${(n / 10000).toFixed(1)}万` : String(n);
}
