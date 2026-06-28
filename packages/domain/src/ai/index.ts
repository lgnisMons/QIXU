/**
 * AI domain — public API.
 *
 * Domain: AI 智能
 * Responsibility: Diagnostics, recommendations, workflow simulation.
 * Future: LangGraph agent orchestration.
 */

export type { AIRecommendation, AIDiagnostic, AIWorkflowState, DiagnosticInput, RecommendationRequest } from "./types";
export { AIDomainError } from "./types";
export { runDiagnostic, generateRecommendations, startAIWorkflow, completeAIWorkflow } from "./service";
