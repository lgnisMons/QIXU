/**
 * Knowledge domain — public API.
 *
 * Domain: 升学知识库
 * Responsibility: University & major data, admission records,
 *   student profile, recommendation rule engine.
 *
 * Future: AI-powered admission recommendation system (Sprint-012+).
 */

export type {
  University, UniversityTier, UniversityType,
  Major, MajorCategory, SubjectType,
  AdmissionRecord,
  StudentProfile, FinancialLevel,
  RuleCategory, RuleResult,
  AdmissionRecommendation, AdmissionRecommendationOutput,
} from "./types";
export { KnowledgeDomainError } from "./types";

// Repository
export {
  mockUniversities, mockMajors, mockAdmissionRecords,
  getAllUniversities, getUniversityById,
  getAllMajors, getMajorById,
  getAdmissionRecords,
} from "./repository";

// Rule Engine
export { runRecommendationEngine } from "./service";
