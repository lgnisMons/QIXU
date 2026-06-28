/**
 * Knowledge domain — recommendation rule engine (mock).
 *
 * 8 rule categories: Reach, Match, Safe, Budget, City, Major, Employment, Risk.
 * Each rule produces a 0–1 score and a pass/fail verdict.
 * Rules are combined into a composite AdmissionRecommendation.
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
// Rule Engine
// ---------------------------------------------------------------------------

export function runRecommendationEngine(
  student: StudentProfile,
  options?: {
    maxRecommendations?: number;
    province?: string;
    year?: number;
    subjectType?: "物理类" | "历史类";
  }
): AdmissionRecommendationOutput {
  const province = options?.province ?? student.province;
  const year = options?.year ?? 2025;
  const subjectType = options?.subjectType ?? "物理类";
  const max = options?.maxRecommendations ?? 15;

  // Fetch candidate records
  const records = getAdmissionRecords({ province, year, subjectType });
  const universities = getAllUniversities();
  const majors = getAllMajors();

  // Evaluate each record
  const scored: AdmissionRecommendation[] = [];

  for (const record of records) {
    const university = universities.find((u) => u.id === record.universityId);
    const major = majors.find((m) => m.id === record.majorId);
    if (!university || !major) continue;

    const rules = evaluateAllRules(student, record, university, major);
    const composite = computeComposite(rules);
    const tier = classifyTier(composite, rules);

    scored.push({
      id: generateId("rec"),
      studentId: "student_001", // placeholder — real user ID in Sprint-012
      universityId: university.id,
      majorId: major.id,
      universityName: university.name,
      majorName: major.name,
      tier,
      compositeScore: composite,
      rules,
      breakdown: buildBreakdown(student, record, university, major, rules),
    });
  }

  // Sort by composite score descending
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
// Individual Rule Evaluators
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
    evaluateCity(student, university),
    evaluateMajor(student, major),
    evaluateEmployment(student, major),
    evaluateRisk(student, record, university, major),
  ];
}

/** Reach (冲): student close to or slightly below cutoff */
function evaluateReach(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  // Reach if student rank is 70%–105% of cutoff rank
  let score: number;
  let detail: string;
  if (rankRatio >= 0.95 && rankRatio <= 1.05) {
    score = 0.9;
    detail = `你的位次(${student.rank})非常接近${record.lowestRank}`;
  } else if (rankRatio >= 0.85 && rankRatio < 0.95) {
    score = 0.6;
    detail = `你的位次略低于录取线，存在一定冲刺空间`;
  } else if (rankRatio > 1.05 && rankRatio <= 1.2) {
    score = 0.4;
    detail = `位次差距较大，冲刺难度较高`;
  } else if (rankRatio > 0.7 && rankRatio < 0.85) {
    score = 0.3;
    detail = `差距明显，不建议作为冲刺目标`;
  } else {
    score = 0.1;
    detail = `差距过大，不建议报考`;
  }
  return {
    category: "reach",
    score,
    label: "冲刺",
    detail,
    passed: score >= 0.4,
  };
}

/** Match (稳): student comfortably above cutoff */
function evaluateMatch(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 1.05 && rankRatio <= 1.3) {
    score = 0.95;
    detail = `位次(${student.rank})在录取范围之内，录取可能性大`;
  } else if (rankRatio > 1.3 && rankRatio <= 1.6) {
    score = 0.85;
    detail = `位次稳超录取线，录取把握很大`;
  } else if (rankRatio >= 1.0 && rankRatio < 1.05) {
    score = 0.65;
    detail = `位次接近录取线边缘，有一定把握`;
  } else if (rankRatio > 0.85 && rankRatio < 1.0) {
    score = 0.35;
    detail = `位次接近但低于录取线，把握不足`;
  } else {
    score = 0.15;
    detail = `差距较大，不属于稳妥选择`;
  }
  return {
    category: "match",
    score,
    label: "稳妥",
    detail,
    passed: score >= 0.6,
  };
}

/** Safe (保): student well above cutoff */
function evaluateSafe(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 1.6) {
    score = 1.0;
    detail = `位次远超录取线，录取几乎确定`;
  } else if (rankRatio >= 1.3) {
    score = 0.9;
    detail = `位次明显高于录取线，保底选择安全`;
  } else if (rankRatio >= 1.1) {
    score = 0.6;
    detail = `有一定安全边际，但不够充分`;
  } else {
    score = 0.1;
    detail = `不适合作为保底选择`;
  }
  return {
    category: "safe",
    score,
    label: "保底",
    detail,
    passed: score >= 0.6,
  };
}

/** Budget: tuition affordability */
function evaluateBudget(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const ratio = student.budget / Math.max(record.tuition, 1);
  let score: number;
  let detail: string;
  if (ratio >= 2) {
    score = 1.0;
    detail = `学费￥${record.tuition}/年在预算￥${student.budget}/年内，负担轻松`;
  } else if (ratio >= 1.0) {
    score = 0.8;
    detail = `学费在预算范围内`;
  } else if (ratio >= 0.8) {
    score = 0.4;
    detail = `学费略超预算，需考虑经济因素`;
  } else {
    score = 0.1;
    detail = `学费超出预算较多`;
  }
  return {
    category: "budget",
    score,
    label: "预算",
    detail,
    passed: ratio >= 1.0,
  };
}

/** City: city preference match */
function evaluateCity(student: StudentProfile, university: University): RuleResult {
  const cityMatch = student.cityPreference.length === 0 ||
    student.cityPreference.some((c) => university.city.includes(c) || c.includes(university.city));
  const provinceMatch = student.province === university.province;
  let score: number;
  let detail: string;
  if (cityMatch && provinceMatch) {
    score = 1.0;
    detail = `${university.city}在你的意向城市列表中，且同省`;
  } else if (cityMatch) {
    score = 0.85;
    detail = `${university.city}在你的意向城市列表中`;
  } else if (student.cityPreference.length === 0) {
    score = 0.7;
    detail = `未设置城市偏好，${university.city}可作为备选`;
  } else {
    score = 0.2;
    detail = `${university.city}不在你的意向城市中`;
  }
  return {
    category: "city",
    score,
    label: "城市",
    detail,
    passed: cityMatch || student.cityPreference.length === 0,
  };
}

/** Major: major category preference match */
function evaluateMajor(student: StudentProfile, major: Major): RuleResult {
  const prefMatch = student.majorPreference.length === 0 ||
    student.majorPreference.includes(major.category);
  let score: number;
  let detail: string;
  if (prefMatch && student.majorPreference.length > 0) {
    score = 1.0;
    detail = `「${major.name}」属于${major.category}，符合你的专业偏好`;
  } else if (student.majorPreference.length === 0) {
    score = 0.6;
    detail = `未设置专业偏好，「${major.name}」可作为选项`;
  } else {
    score = 0.15;
    detail = `「${major.name}」(${major.category})不在你的偏好中`;
  }
  return {
    category: "major",
    score,
    label: "专业",
    detail,
    passed: prefMatch,
  };
}

/** Employment: career direction alignment with major */
function evaluateEmployment(_student: StudentProfile, major: Major): RuleResult {
  const hasCareerPref = _student.careerPreference.length > 0;
  const careerOverlap = hasCareerPref
    ? major.employmentDirection.filter((d) =>
      _student.careerPreference.some((c) => d.includes(c) || c.includes(d))
    ).length
    : 0;
  const total = Math.max(major.employmentDirection.length, 1);
  const overlapRatio = careerOverlap / total;

  let score: number;
  let detail: string;
  if (careerOverlap >= 2) {
    score = 1.0;
    detail = `就业方向(${major.employmentDirection.slice(0, 3).join("、")})与你的职业偏好高度匹配`;
  } else if (careerOverlap >= 1 || overlapRatio >= 0.3) {
    score = 0.7;
    detail = `就业方向部分匹配你的职业偏好`;
  } else if (!hasCareerPref) {
    score = 0.5;
    detail = `未设置职业偏好，就业方向参考：${major.employmentDirection.slice(0, 2).join("、")}`;
  } else {
    score = 0.3;
    detail = `就业方向与你的偏好匹配度较低，可进一步了解`;
  }
  return {
    category: "employment",
    score,
    label: "就业",
    detail,
    passed: score >= 0.5,
  };
}

/** Risk: comprehensive risk assessment */
function evaluateRisk(
  _student: StudentProfile,
  record: AdmissionRecord,
  _university: University,
  _major: Major
): RuleResult {
  const rankRatio = record.lowestRank / Math.max(_student.rank, 1);
  const budgetOk = _student.budget >= record.tuition;

  let riskLevel: "low" | "medium" | "high";
  let score: number;
  let detail: string;

  const riskFactors: string[] = [];
  let riskCount = 0;

  if (rankRatio < 1.0) {
    riskCount++;
    riskFactors.push("位次低于往年录取线");
  }
  if (!budgetOk) {
    riskCount++;
    riskFactors.push("学费超出预算");
  }
  if (_student.adjustmentAccepted) {
    riskCount = Math.max(0, riskCount - 1);
  }

  if (riskCount === 0) {
    riskLevel = "low";
    score = 0.9;
    detail = _student.adjustmentAccepted
      ? "接受专业调剂，风险进一步降低"
      : "综合风险较低";
  } else if (riskCount === 1) {
    riskLevel = "medium";
    score = 0.55;
    detail = `存在一定风险：${riskFactors.join("；")}`;
  } else {
    riskLevel = "high";
    score = 0.2;
    detail = `风险较高：${riskFactors.join("；")}`;
  }

  return {
    category: "risk",
    score,
    label: "风险",
    detail,
    passed: riskLevel !== "high",
  };
}

// ---------------------------------------------------------------------------
// Composite Scoring & Tier Classification
// ---------------------------------------------------------------------------

function computeComposite(rules: RuleResult[]): number {
  const weights: Record<RuleCategory, number> = {
    reach: 0.15,
    match: 0.20,
    safe: 0.10,
    budget: 0.15,
    city: 0.10,
    major: 0.15,
    employment: 0.05,
    risk: 0.10,
  };

  const weighted = rules.reduce((sum, r) => sum + r.score * (weights[r.category] ?? 0.1), 0);
  return Math.round(weighted * 100);
}

function classifyTier(
  composite: number,
  rules: RuleResult[]
): "reach" | "match" | "safe" {
  const matchScore = rules.find((r) => r.category === "match")?.score ?? 0;
  const reachScore = rules.find((r) => r.category === "reach")?.score ?? 0;
  const safeScore = rules.find((r) => r.category === "safe")?.score ?? 0;

  if (safeScore >= 0.8 && composite >= 70) return "safe";
  if (matchScore >= 0.7 && composite >= 55) return "match";
  return "reach";
}

function buildBreakdown(
  student: StudentProfile,
  record: AdmissionRecord,
  university: University,
  major: Major,
  rules: RuleResult[]
): AdmissionRecommendation["breakdown"] {
  const matchRule = rules.find((r) => r.category === "match")!;
  const budgetRule = rules.find((r) => r.category === "budget")!;
  const cityRule = rules.find((r) => r.category === "city")!;
  const majorRule = rules.find((r) => r.category === "major")!;
  const employmentRule = rules.find((r) => r.category === "employment")!;
  const riskRule = rules.find((r) => r.category === "risk")!;

  return {
    scoreGap: student.score - record.lowestScore,
    rankGap: record.lowestRank - student.rank,
    budgetFit: budgetRule.passed,
    cityMatch: cityRule.passed,
    majorMatch: majorRule.passed,
    employmentScore: Math.round(employmentRule.score * 10),
    riskLevel: riskRule.passed ? (matchRule.score >= 0.7 ? "low" : "medium") : "high",
  };
}

function buildSummary(
  recommendations: AdmissionRecommendation[],
  student: StudentProfile
): string {
  const reach = recommendations.filter((r) => r.tier === "reach").length;
  const match = recommendations.filter((r) => r.tier === "match").length;
  const safe = recommendations.filter((r) => r.tier === "safe").length;

  return [
    `基于你的${student.score}分成绩(位次${student.rank})，`,
    `系统为你生成${recommendations.length}条推荐：`,
    `${safe}个保底、${match}个稳妥、${reach}个冲刺。`,
    student.cityPreference.length > 0
      ? `城市偏好：${student.cityPreference.join("、")}。`
      : "",
    student.majorPreference.length > 0
      ? `专业偏好：${student.majorPreference.join("、")}。`
      : "",
    "建议结合个人兴趣与职业规划，综合考虑后做出选择。",
  ]
    .filter(Boolean)
    .join("");
}
