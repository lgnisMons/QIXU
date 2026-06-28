/**
 * AI domain — internal types.
 */

export type { AIRecommendation, AIDiagnostic, AIWorkflowState } from "@qixu/contracts";

export class AIDomainError extends Error {
  constructor(message: string, public code: string) {
    super(message); this.name = "AIDomainError";
  }
}

export interface DiagnosticInput {
  userId: string;
  subject: string;
  responses: { questionId: string; answer: string }[];
}

export interface RecommendationRequest {
  userId: string;
  type: "learning_path" | "resource" | "tutor" | "topic";
  context: string;
  constraints?: string[];
}
