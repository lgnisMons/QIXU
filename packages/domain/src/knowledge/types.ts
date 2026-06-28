/**
 * Knowledge domain — types.
 *
 * University, Major, AdmissionRecord, StudentProfile, and
 * recommendation rule types for the future AI Admission System.
 *
 * All schemas defined here; no AI/LLM integration yet.
 */

// ---------------------------------------------------------------------------
// University
// ---------------------------------------------------------------------------

export type UniversityTier =
  | "985"
  | "211"
  | "双一流"
  | "普通本科"
  | "专科";

export type UniversityType =
  | "综合"
  | "理工"
  | "师范"
  | "医药"
  | "农林"
  | "政法"
  | "财经"
  | "语言"
  | "艺术"
  | "体育";

export interface University {
  id: string;
  name: string;
  province: string;
  city: string;
  tier: UniversityTier;
  type: UniversityType;
  tags: string[];
  website: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Major
// ---------------------------------------------------------------------------

export type MajorCategory =
  | "工学"
  | "理学"
  | "医学"
  | "文学"
  | "经济学"
  | "管理学"
  | "法学"
  | "教育学"
  | "艺术学"
  | "农学";

export interface Major {
  id: string;
  name: string;
  category: MajorCategory;
  employmentDirection: string[];
  graduateDirection: string[];
  /** 1-10 scale — 10 = most popular */
  popularity: number;
}

// ---------------------------------------------------------------------------
// Admission Record
// ---------------------------------------------------------------------------

export type SubjectType = "物理类" | "历史类";

export interface AdmissionRecord {
  id: string;
  year: number;
  province: string;
  subjectType: SubjectType;
  universityId: string;
  majorId: string;
  lowestScore: number;
  lowestRank: number;
  quota: number;
  tuition: number; // CNY per year
}

// ---------------------------------------------------------------------------
// Student Profile
// ---------------------------------------------------------------------------

export type FinancialLevel = "low" | "medium" | "high";

export interface StudentProfile {
  province: string;
  subjectType: SubjectType;
  score: number;
  rank: number;
  /** Annual total budget including tuition + living (CNY) */
  budget: number;
  careerPreference: string[];
  majorPreference: MajorCategory[];
  cityPreference: string[];
  adjustmentAccepted: boolean;
  cooperativeProgramAccepted: boolean;
  familyFinancialLevel: FinancialLevel;
}

// ---------------------------------------------------------------------------
// Recommendation Rules
// ---------------------------------------------------------------------------

export type RuleCategory =
  | "reach"
  | "match"
  | "safe"
  | "budget"
  | "city"
  | "major"
  | "employment"
  | "risk";

export interface RuleResult {
  category: RuleCategory;
  score: number; // 0–1, higher = better match
  label: string;
  detail: string;
  passed: boolean;
}

/** A single recommendation entry linking a student to a specific major at a university */
export interface AdmissionRecommendation {
  id: string;
  studentId: string;
  universityId: string;
  majorId: string;
  universityName: string;
  universityCity: string;
  majorName: string;
  tuition: number;
  tier: "reach" | "match" | "safe";
  compositeScore: number; // 0–100
  rules: RuleResult[];
  breakdown: {
    scoreGap: number; // positive = above cutoff, negative = below
    rankGap: number; // positive = better rank, negative = worse
    budgetFit: boolean;
    cityMatch: boolean;
    majorMatch: boolean;
    employmentScore: number; // 0–10
    riskLevel: "low" | "medium" | "high";
  };
}

/** Full recommendation output */
export interface AdmissionRecommendationOutput {
  student: StudentProfile;
  recommendations: AdmissionRecommendation[];
  summary: string;
  generatedAt: string;
}

// ---------------------------------------------------------------------------
// Domain Error
// ---------------------------------------------------------------------------

export class KnowledgeDomainError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "KnowledgeDomainError";
  }
}
