/**
 * @qixu/domain — Domain Layer
 *
 * Domain-Driven Design: each domain is self-contained.
 * No direct cross-domain imports of internal logic.
 * Cross-domain communication via @qixu/contracts.
 *
 * Domains:
 *   learning   — Learning plans, objectives, paths
 *   tutor      — Tutor matching, sessions
 *   ai         — AI diagnostics, recommendations
 *   growth     — Growth tracking, reports
 *   assessment — Assessments, scoring
 *   user       — User profiles, preferences
 */

// Learning domain
export {
  createLearningPlan, getLearningPlan, listUserPlans,
  activatePlan, completeObjective, generateLearningPath,
  LearningDomainError,
} from "./learning";
export type {
  LearningPlan, LearningObjective, LearningPathSegment, LearningPath,
  CreatePlanInput, PlanGenerationParams,
} from "./learning";

// Tutor domain
export {
  listTutors, getTutor, matchTutor,
  acceptMatch, createSession, completeSession,
  TutorDomainError,
} from "./tutor";
export type {
  TutorProfile, TutorMatch, TutorSession,
  TutorFilter, MatchRequestInput,
} from "./tutor";

// AI domain
export {
  runDiagnostic, generateRecommendations,
  startAIWorkflow, completeAIWorkflow,
  AIDomainError,
} from "./ai";
export type {
  AIRecommendation, AIDiagnostic, AIWorkflowState,
  DiagnosticInput, RecommendationRequest,
} from "./ai";

// Growth domain
export {
  addGrowthRecord, getUserRecords, addMilestone, generateGrowthReport,
  GrowthDomainError,
} from "./growth";
export type {
  GrowthMilestone, GrowthMetric, GrowthReport, GrowthRecord,
  ReportGenerationInput,
} from "./growth";

// Assessment domain
export {
  createAssessment, submitAnswers, getAssessmentResult, listUserAssessments,
  AssessmentDomainError,
} from "./assessment";
export type {
  AssessmentQuestion, AssessmentAnswer, AssessmentResult,
  CreateAssessmentInput, SubmitAnswersInput,
} from "./assessment";

// User domain
export {
  registerUser, getUserProfile, getUserPreferences, getUserStats,
  UserDomainError,
} from "./user";
export type {
  UserProfile, UserPreferences, UserStats, RegisterUserInput,
} from "./user";
