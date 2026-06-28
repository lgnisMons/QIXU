/**
 * Assessment domain — public API.
 *
 * Domain: 能力评估
 * Responsibility: Assessment creation, answer scoring, engine analysis, report generation.
 *
 * Layers:
 *   service.ts — CRUD operations (assessment lifecycle)
 *   engine.ts  — Mock analysis engine (→ future LangGraph)
 *   report.ts  — Structured report sections for UI rendering
 */

export type {
  AssessmentQuestion, AssessmentAnswer, AssessmentResult,
  CreateAssessmentInput, SubmitAnswersInput,
  AssessmentEngineInput, LearningProfile, TutorSuggestion,
  AssessmentEngineOutput,
} from "./types";
export { AssessmentDomainError } from "./types";

// Service layer
export { createAssessment, submitAnswers, getAssessmentResult, listUserAssessments } from "./service";

// Engine layer
export { runAssessmentEngine } from "./engine";

// Report layer
export { generateReport } from "./report";
export type { ReportSection, ReportContent, SnapshotContent, AnalysisContent, SuggestionsContent, NextStepContent, TimelineContent } from "./report";
