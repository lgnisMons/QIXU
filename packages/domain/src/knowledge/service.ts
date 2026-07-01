/**
 * Knowledge domain — recommendation rule engine.
 *
 * 7 rule categories: Reach, Match, Safe, Budget, Major, Employment, Risk.
 * Tier boundaries (clean partition, no overlap):
 *   Reach: rankRatio < 1.00 (student at or below cutoff)
 *   Match: rankRatio 1.00 — 1.50 (student above cutoff)
 *   Safe:  rankRatio 1.50+          (student well above cutoff)
 *
 * Province filtering is applied at data query level — only records matching
 * the student's province and subject type are considered.
 *
 * No AI/LLM — pure rule-based scoring. Extensible for future ML models.
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

// Cooperative / high-tuition threshold (CNY/year)
const COOP_TUITION_THRESHOLD = 50000;

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

function formatK(n: number): string {
  return n >= 10000 ? `${(n / 10000).toFixed(1)}万` : String(n);
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
  }
): AdmissionRecommendationOutput {
  const year = options?.year ?? 2025;
  const subjectType = options?.subjectType ?? student.subjectType;
  const max = options?.maxRecommendations ?? 15;

  // FIX Bug 2: Filter by student's province AND subject type at data level
  let records = getAdmissionRecords({
    year,
    subjectType,
    province: student.province, // CRITICAL: only load records for student's province
  });
  const universities = getAllUniversities();
  const majors = getAllMajors();

  // Deduplicate universities by ID, preferring real data (gd-*) over mock (u-*)
  const uniById = new Map<string, University>();
  // Track which names we've seen to skip duplicate mocks
  const seenNames = new Set<string>();
  for (const u of universities) {
    const isMock = u.id.startsWith("u-");
    if (isMock && seenNames.has(u.name)) continue;
    uniById.set(u.id, u);
    seenNames.add(u.name);
  }

  const scored: AdmissionRecommendation[] = [];
  const perUniCount = new Map<string, number>();

  for (const record of records) {
    const university = uniById.get(record.universityId);
    const major = majors.find((m) => m.id === record.majorId);
    if (!university || !major) continue;

    // Limit to at most 2 recommendations per university to avoid one school dominating
    const count = perUniCount.get(university.id) ?? 0;
    if (count >= 2) continue;
    perUniCount.set(university.id, count + 1);

    const { rules, riskLevel } = evaluateAllRules(student, record, major);
    const composite = computeComposite(rules);
    const tier = classifyTier(rules);

    scored.push({
      id: generateId("rec"),
      studentId: "student",
      universityId: university.id,
      majorId: major.id,
      universityName: university.name,
      universityCity: university.city,
      universityProvince: university.province,
      majorName: major.id === "m-unified" ? "不限专业（投档线）" : major.name,
      tuition: record.tuition,
      tier,
      compositeScore: composite,
      lowestRank: record.lowestRank,
      lowestScore: record.lowestScore,
      rules,
      breakdown: buildBreakdown(student, record, rules, riskLevel),
    });
  }

  scored.sort((a, b) => b.compositeScore - a.compositeScore);
  const top = scored.slice(0, max);
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
  major: Major,
): { rules: RuleResult[]; riskLevel: "low" | "medium" | "high" } {
  const risk = evaluateRisk(student, record);
  return {
    rules: [
      evaluateReach(student, record),
      evaluateMatch(student, record),
      evaluateSafe(student, record),
      evaluateBudget(student, record),
      evaluateMajor(student, major),
      evaluateEmployment(student, major),
      risk.rule,
    ],
    riskLevel: risk.riskLevel,
  };
}

/** Reach (冲): student rank close to or below cutoff (rankRatio <= 1.00) */
function evaluateReach(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;

  // FIX Bug 7: rankRatio > 1 means student is ABOVE cutoff (safe/match zone),
  // not reach. Reach only applies when rankRatio < 1.
  if (rankRatio >= 0.95 && rankRatio <= 1.00) {
    score = 0.9;
    detail = `位次(${student.rank.toLocaleString()})非常接近录取位次(${record.lowestRank.toLocaleString()})，可以冲刺`;
  } else if (rankRatio >= 0.85 && rankRatio < 0.95) {
    score = 0.65;
    detail = `位次略低于录取线，有一定冲刺可能`;
  } else if (rankRatio >= 0.70 && rankRatio < 0.85) {
    score = 0.3;
    detail = `差距明显，冲刺难度较高`;
  } else if (rankRatio > 1.00) {
    score = 0.15;
    detail = `位次已超过录取线，不属于冲刺范围`;
  } else {
    score = 0.05;
    detail = `差距过大，不建议作为冲刺目标`;
  }
  return { category: "reach", score, label: "冲刺", detail, passed: score >= 0.4 };
}

/** Match (稳): student above cutoff (rankRatio 1.00 — 1.50) */
function evaluateMatch(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 1.10 && rankRatio <= 1.50) {
    score = 0.95;
    detail = `位次(${student.rank.toLocaleString()})在录取范围(${record.lowestRank.toLocaleString()})之内，录取可能性大`;
  } else if (rankRatio > 1.50 && rankRatio <= 2.00) {
    score = 0.8;
    detail = `位次稳超录取线，录取把握很大`;
  } else if (rankRatio >= 1.00 && rankRatio < 1.10) {
    score = 0.6;
    detail = `位次刚好越过录取线，有较大把握但需注意风险`;
  } else if (rankRatio > 2.00) {
    score = 0.4;
    detail = `位次远超录取线，建议作为保底而非稳妥`;
  } else {
    score = 0.1;
    detail = `位次未达录取线，不属于稳妥选择`;
  }
  return { category: "match", score, label: "稳妥", detail, passed: score >= 0.55 };
}

/** Safe (保): student well above cutoff (rankRatio 1.50+) */
function evaluateSafe(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 2.00) {
    score = 1.0;
    detail = `位次(${student.rank.toLocaleString()})远超录取线(${record.lowestRank.toLocaleString()})，录取几乎确定`;
  } else if (rankRatio >= 1.50) {
    score = 0.85;
    detail = `位次明显高于录取线，保底安全`;
  } else {
    score = 0.1;
    detail = `不适合作为保底选择`;
  }
  return { category: "safe", score, label: "保底", detail, passed: score >= 0.6 };
}

/** Budget: tuition vs student budget */
function evaluateBudget(student: StudentProfile, record: AdmissionRecord): RuleResult {
  // FIX Bug 5: Removed broken costMultiplier. Check tuition directly.
  // High-tuition (cooperative) programs are flagged in risk evaluation instead.
  const effectiveCost = record.tuition;
  const ratio = student.budget / Math.max(effectiveCost, 1);

  let score: number;
  let detail: string;
  // FIX Bug 8: passed threshold must respect strictness for low-income families
  const strictness = student.familyFinancialLevel === "low" ? 1.2 : 1.0;
  const passedThreshold = 1.0 * strictness;

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
  return { category: "budget", score, label: "预算", detail, passed: ratio >= passedThreshold };
}

/** Major: category preference match */
function evaluateMajor(student: StudentProfile, major: Major): RuleResult {
  // m-unified (投档线) means "any major at this school" — don't penalize for major mismatch
  const isUnified = major.id === "m-unified";
  const prefMatch = isUnified ||
    student.majorPreference.length === 0 ||
    student.majorPreference.includes(major.category);

  let score: number;
  let detail: string;
  if (isUnified) {
    score = 0.7;
    detail = `按学校投档线计算，具体专业需入校后分流或选择`;
  } else if (prefMatch && student.majorPreference.length > 0) {
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
  // m-unified has no employment direction
  if (major.id === "m-unified") {
    return { category: "employment", score: 0.5, label: "就业", detail: "投档线数据，专业就业方向需入校后确定", passed: true };
  }

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

/** Risk: comprehensive admission risk. Returns both rule result and risk level. */
function evaluateRisk(
  student: StudentProfile,
  record: AdmissionRecord,
): { rule: RuleResult; riskLevel: "low" | "medium" | "high" } {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  const budgetOk = student.budget >= record.tuition;

  const riskFactors: string[] = [];
  if (rankRatio < 0.90) riskFactors.push("位次低于往年录取线，录取难度大");
  else if (rankRatio < 1.0) riskFactors.push("位次接近录取线边缘");
  if (!budgetOk) riskFactors.push("学费超出预算");
  // FIX Bug 6: Flag when student does NOT accept cooperative programs
  // but tuition is high (suggesting cooperative/expensive program)
  if (!student.cooperativeProgramAccepted && record.tuition > COOP_TUITION_THRESHOLD) {
    riskFactors.push("高学费项目（可能为中外合作办学），你未接受此类项目");
  }
  // FIX: Not accepting adjustment increases risk when close to cutoff
  if (!student.adjustmentAccepted && rankRatio < 1.10) {
    riskFactors.push("未接受专业调剂，进档后存在退档风险");
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

  return {
    rule: { category: "risk", score, label: "风险", detail, passed: riskLevel !== "high" },
    riskLevel,
  };
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
  rules: RuleResult[],
  riskLevel: "low" | "medium" | "high",
): AdmissionRecommendation["breakdown"] {
  const budgetRule = findRule(rules, "budget");
  const majorRule = findRule(rules, "major");
  const employmentRule = findRule(rules, "employment");

  return {
    scoreGap: student.score - record.lowestScore,
    rankGap: record.lowestRank - student.rank,
    budgetFit: budgetRule.passed,
    majorMatch: majorRule.passed,
    employmentScore: Math.round(employmentRule.score * 10),
    riskLevel,
  };
}

function buildSummary(
  recommendations: AdmissionRecommendation[],
  student: StudentProfile,
): string {
  const reach = recommendations.filter((r) => r.tier === "reach").length;
  const match = recommendations.filter((r) => r.tier === "match").length;
  const safe = recommendations.filter((r) => r.tier === "safe").length;

  const parts = [
    `基于你的${student.score}分(位次${student.rank.toLocaleString()}，${student.subjectType}，${student.province})`,
    `${recommendations.length === 0 ? "暂无" : `共${recommendations.length}条`}推荐：`,
    `${safe}保底 · ${match}稳妥 · ${reach}冲刺。`,
    student.majorPreference.length > 0 ? `专业偏好：${student.majorPreference.join("、")}。` : "",
    recommendations.length === 0
      ? `当前${student.province}${student.subjectType}数据暂不足，正在努力扩展中。`
      : "建议结合兴趣、职业规划和家庭情况综合考虑，最终决策由你做出。",
  ];
  return parts.filter(Boolean).join("");
}

export { evaluateAllRules, evaluateReach, evaluateMatch, evaluateSafe, evaluateBudget, evaluateMajor, evaluateEmployment, evaluateRisk };
