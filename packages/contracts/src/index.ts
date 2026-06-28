/**
 * @qixu/contracts — Domain Contract Layer
 *
 * Pure TypeScript interfaces shared across all domains.
 * No implementation, no runtime dependency, no imports from other packages.
 *
 * Domain contracts define WHAT data looks like.
 * Domain services define HOW data is processed.
 * Domain runtime orchestrates cross-domain workflows.
 */

export type {
  LearningObjective,
  LearningPlan,
  LearningPathSegment,
  LearningPath,
} from "./learning";

export type {
  TutorProfile,
  TutorMatch,
  TutorSession,
} from "./tutor";

export type {
  AIRecommendation,
  AIDiagnostic,
  AIWorkflowState,
} from "./ai";

export type {
  GrowthMilestone,
  GrowthMetric,
  GrowthReport,
  GrowthRecord,
} from "./growth";

export type {
  AssessmentQuestion,
  AssessmentAnswer,
  AssessmentResult,
} from "./assessment";

export type {
  UserProfile,
  UserPreferences,
  UserStats,
} from "./user";
