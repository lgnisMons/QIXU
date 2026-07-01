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
  StudentProfile, University, UniversityType, Major, AdmissionRecord,
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

const MIN_VIABLE_RANK_RATIO = 0.5; // Skip records where gap is >2x (effectively impossible)
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

    // Skip clearly impossible reaches: gap >2x (e.g. Tsinghua for rank 1800 student)
    const rankRatio = record.lowestRank / Math.max(student.rank, 1);
    if (rankRatio < MIN_VIABLE_RANK_RATIO) continue;

    const { rules, riskLevel } = evaluateAllRules(student, record, major, university);
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
      universityTier: university.tier,
      universityType: university.type,
      majorName: major.id === "m-unified" ? "参考往年最低录取位次" : major.name,
      tuition: record.tuition,
      tier,
      compositeScore: composite,
      lowestRank: record.lowestRank,
      lowestScore: record.lowestScore,
      dataQuality: record.dataQuality ?? "estimated",
      dataYear: record.year,
      rules,
      breakdown: buildBreakdown(student, record, rules, riskLevel),
    });
  }

  scored.sort((a, b) => b.compositeScore - a.compositeScore);
  let top = scored.slice(0, max);

  // Low score auto-supplement: add college/vocational safety net for students near or below cutoff
  const LOW_SCORE_THRESHOLD = 460; // Approximate undergraduate cutoff line
  if (student.score < LOW_SCORE_THRESHOLD) {
    // Collect college records NOT already in the top list (avoid duplicates)
    const topIds = new Set(top.map((r) => r.id));
    const collegeRecs = scored.filter((r) => r.universityTier === "专科" && !topIds.has(r.id));
    const topColleges = collegeRecs.slice(0, 3);
    const markedColleges = topColleges.map((r) => ({
      ...r,
      tier: "college" as const,
    }));
    top = [...top, ...markedColleges];
  }

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
  university?: University,
): { rules: RuleResult[]; riskLevel: "low" | "medium" | "high" } {
  const risk = evaluateRisk(student, record);
  return {
    rules: [
      evaluateReach(student, record),
      evaluateMatch(student, record),
      evaluateSafe(student, record),
      evaluateBudget(student, record, university),
      evaluateMajor(student, major, university),
      evaluateEmployment(student, major),
      risk.rule,
    ],
    riskLevel: risk.riskLevel,
  };
}

/** Reach (冲): student rank close to or below cutoff (rankRatio < 1.00) */
function evaluateReach(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;

  // rankRatio >= 1.00 means student is AT or ABOVE cutoff — not a reach.
  // Only rankRatio < 1.00 (student below cutoff) is a legitimate reach attempt.
  if (rankRatio >= 0.95 && rankRatio < 1.00) {
    score = 0.88;
    detail = `位次(${student.rank.toLocaleString()})非常接近录取位次(${record.lowestRank.toLocaleString()})，可以冲刺`;
  } else if (rankRatio >= 0.85 && rankRatio < 0.95) {
    score = 0.65;
    detail = `位次略低于录取线，有一定冲刺可能`;
  } else if (rankRatio >= 0.70 && rankRatio < 0.85) {
    score = 0.3;
    detail = `差距明显，冲刺难度较高`;
  } else if (rankRatio >= 1.00) {
    score = 0.12;
    detail = `位次已达到或超过录取线，不属于冲刺范围`;
  } else {
    score = 0.05;
    detail = `差距过大，不建议作为冲刺目标`;
  }
  return { category: "reach", score, label: "冲刺", detail, passed: score >= 0.4 };
}

/** Match (稳): student at or above cutoff (rankRatio >= 1.00) */
function evaluateMatch(student: StudentProfile, record: AdmissionRecord): RuleResult {
  const rankRatio = record.lowestRank / Math.max(student.rank, 1);
  let score: number;
  let detail: string;
  if (rankRatio >= 1.50 && rankRatio <= 2.00) {
    score = 0.92;
    detail = `位次(${student.rank.toLocaleString()})稳超录取线(${record.lowestRank.toLocaleString()})，录取把握很大`;
  } else if (rankRatio >= 1.10 && rankRatio < 1.50) {
    score = 0.85;
    detail = `位次在录取范围之内，录取可能性大`;
  } else if (rankRatio >= 1.00 && rankRatio < 1.10) {
    score = 0.6;
    detail = `位次刚好越过录取线，有一定把握但需关注分数线波动`;
  } else if (rankRatio > 2.00) {
    score = 0.4;
    detail = `位次远超录取线，录取基本确定，建议重点关注稳妥范围内更高层次的学校`;
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

/** Budget: tuition + estimated living cost vs student budget */

// City-level living cost reference (CNY/year)
const CITY_LIVING_COST: Record<string, number> = {
  "深圳": 24000, "北京": 26000, "上海": 26000, "广州": 20000,
  "杭州": 20000, "武汉": 16000, "南京": 18000, "成都": 15000,
  "长沙": 15000, "青岛": 16000, "郑州": 14000, "福州": 16000,
  "珠海": 18000, "东莞": 16000, "佛山": 16000, "厦门": 20000,
  "汕头": 14000, "湛江": 13000, "茂名": 12000, "江门": 13000,
  "惠州": 14000, "肇庆": 12000, "韶关": 12000, "梅州": 11000,
  "潮州": 12000, "中山": 16000, "金华": 14000, "镇江": 14000,
  "湘潭": 12000, "宁波": 18000, "苏州": 18000, "无锡": 17000,
  "重庆": 15000, "西安": 14000, "天津": 18000, "大连": 15000,
  "沈阳": 14000, "哈尔滨": 13000, "长春": 13000, "济南": 16000,
  "合肥": 15000, "南昌": 14000, "昆明": 13000, "贵阳": 13000,
  "南宁": 13000, "海口": 15000, "兰州": 12000, "银川": 12000,
  "乌鲁木齐": 12000, "呼和浩特": 13000, "西宁": 11000, "拉萨": 12000,
  "太原": 13000, "石家庄": 13000, "廊坊": 14000, "烟台": 14000,
};
const DEFAULT_LIVING_COST = 15000;

function getLivingCost(city: string): number {
  for (const [k, v] of Object.entries(CITY_LIVING_COST)) {
    if (city.includes(k)) return v;
  }
  return DEFAULT_LIVING_COST;
}

function evaluateBudget(student: StudentProfile, record: AdmissionRecord, university?: University): RuleResult {
  // Use city-specific living cost if university info is available
  const livingCost = university ? getLivingCost(university.city) : DEFAULT_LIVING_COST;
  const totalCost = record.tuition + livingCost;
  const ratio = student.budget / Math.max(totalCost, 1);

  let score: number;
  let detail: string;
  const strictness = student.familyFinancialLevel === "low" ? 1.3 : 1.0;
  const passedThreshold = 1.0 * strictness;

  if (ratio >= 2.5 * strictness) {
    score = 0.95;
    detail = `学费¥${formatK(record.tuition)}/年 + 生活费≈¥${formatK(livingCost)}/年，合计¥${formatK(totalCost)}/年，预算充足`;
  } else if (ratio >= 1.3 * strictness) {
    score = 0.85;
    detail = `学费¥${formatK(record.tuition)}/年 + 生活费≈¥${formatK(livingCost)}/年，合计¥${formatK(totalCost)}/年，在预算范围内`;
  } else if (ratio >= passedThreshold) {
    score = 0.6;
    const warn = student.familyFinancialLevel === "low" ? "（家庭经济一般，建议谨慎考虑）" : "";
    detail = `学费¥${formatK(record.tuition)}/年 + 生活费≈¥${formatK(livingCost)}/年，合计¥${formatK(totalCost)}/年，预算基本够用${warn}`;
  } else if (ratio >= 0.7) {
    score = 0.35;
    detail = `合计费用¥${formatK(totalCost)}/年略超预算¥${formatK(student.budget)}/年，需考虑经济因素`;
  } else {
    score = 0.1;
    detail = `合计费用¥${formatK(totalCost)}/年超出预算¥${formatK(student.budget)}/年较多，经济压力大`;
  }
  return { category: "budget", score, label: "预算", detail, passed: ratio >= passedThreshold };
}

/** Major: category preference match */

// University type to major category mapping for better matching with m-unified records
const UNI_TYPE_TO_MAJORS: Record<UniversityType, string[]> = {
  "综合": ["工学", "理学", "文学", "经济学", "管理学", "法学", "教育学"],
  "理工": ["工学", "理学"],
  "师范": ["教育学", "文学", "理学", "历史学", "哲学"],
  "医药": ["医学", "药学", "护理学", "公共卫生与预防医学"],
  "农林": ["农学", "理学", "工学"],
  "政法": ["法学", "政治学", "社会学"],
  "财经": ["经济学", "管理学", "金融学"],
  "语言": ["文学", "外国语言文学", "翻译"],
  "艺术": ["艺术学", "设计学", "音乐与舞蹈学", "戏剧与影视学"],
  "体育": ["教育学", "体育学"],
  "民族": ["法学", "文学", "经济学", "教育学", "管理学"], // 民族类以人文社科为主
};

function calcUniversityTypeMatch(
  uniType: UniversityType,
  prefs: string[],
): { score: number; passed: boolean; desc: string } {
  if (prefs.length === 0) {
    return { score: 0.6, passed: true, desc: "未设置专业偏好" };
  }
  const matchMajors = UNI_TYPE_TO_MAJORS[uniType] ?? [];
  const overlap = prefs.filter((p) => matchMajors.includes(p)).length;
  const ratio = overlap / prefs.length;

  if (ratio >= 0.6) return { score: 0.85, passed: true, desc: `${uniType}类院校与你的专业偏好高度匹配` };
  if (ratio >= 0.3) return { score: 0.7, passed: true, desc: `${uniType}类院校与你的专业偏好部分匹配` };
  if (overlap > 0) return { score: 0.55, passed: false, desc: `${uniType}类院校与你的偏好关联度一般` };
  return { score: 0.4, passed: false, desc: `${uniType}类院校与你的偏好关联度较低` };
}

function evaluateMajor(student: StudentProfile, major: Major, university?: University): RuleResult {
  // m-unified (投档线) means "any major at this school" — use university type to infer match
  const isUnified = major.id === "m-unified";
  const prefMatch = !isUnified &&
    (student.majorPreference.length === 0 ||
    student.majorPreference.includes(major.category));

  let score: number;
  let detail: string;
  let passed: boolean;

  if (isUnified && university) {
    // For 投档线 data, use university type to infer major match quality
    const typeMatch = calcUniversityTypeMatch(university.type, student.majorPreference);
    score = typeMatch.score;
    detail = `${university.name}是${university.type}类院校，${typeMatch.desc}`;
    passed = typeMatch.passed;
  } else if (isUnified) {
    // Fallback: no university info, use default score
    score = 0.7;
    detail = `按学校最低录取位次计算，具体专业需入校后分流或选择`;
    passed = true;
  } else if (prefMatch && student.majorPreference.length > 0) {
    score = 1.0;
    detail = `「${major.name}」(${major.category})符合你的专业偏好`;
    passed = true;
  } else if (student.majorPreference.length === 0) {
    score = 0.6;
    detail = `未设置专业偏好，「${major.name}」可作为选项`;
    passed = true;
  } else {
    score = 0.15;
    detail = `「${major.name}」(${major.category})不在你的偏好中`;
    passed = false;
  }
  return { category: "major", score, label: "专业", detail, passed };
}

/** Employment: career direction alignment */
function evaluateEmployment(student: StudentProfile, major: Major): RuleResult {
  // m-unified has no employment direction
  if (major.id === "m-unified") {
    return { category: "employment", score: 0.5, label: "就业", detail: "最低录取位次参考，具体就业方向需在入校确定专业后了解", passed: true };
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
    riskFactors.push("未接受专业调剂，可能因专业满额而被学校退回档案");
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
  const college = recommendations.filter((r) => r.tier === "college").length;

  const parts = [
    `基于你的${student.score}分(位次${student.rank.toLocaleString()}，${student.subjectType}，${student.province})`,
    `${recommendations.length === 0 ? "暂无" : `共${recommendations.length}条`}推荐：`,
    `${safe}保底 · ${match}稳妥 · ${reach}冲刺${college > 0 ? ` · ${college}专科保底` : ""}。`,
    student.majorPreference.length > 0 ? `专业偏好：${student.majorPreference.join("、")}。` : "",
    recommendations.length === 0
      ? `当前${student.province}${student.subjectType}数据暂不足，正在努力扩展中。`
      : "建议结合兴趣、职业规划和家庭情况综合考虑，最终决策由你做出。",
  ];
  return parts.filter(Boolean).join("");
}

export { evaluateAllRules, evaluateReach, evaluateMatch, evaluateSafe, evaluateBudget, evaluateMajor, evaluateEmployment, evaluateRisk };
