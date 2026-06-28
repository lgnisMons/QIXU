/**
 * Assessment domain — public API.
 *
 * Domain: 能力评估
 * Responsibility: Assessment creation, answer scoring, result analysis.
 */

export type { AssessmentQuestion, AssessmentAnswer, AssessmentResult, CreateAssessmentInput, SubmitAnswersInput } from "./types";
export { AssessmentDomainError } from "./types";
export { createAssessment, submitAnswers, getAssessmentResult, listUserAssessments } from "./service";
