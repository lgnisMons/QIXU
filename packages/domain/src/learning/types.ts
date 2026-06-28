/**
 * Learning domain — internal types.
 *
 * Domain types extend or compose contract types.
 * Contracts define the shape; domain types add domain-specific context.
 */

import type { LearningPlan as ContractLearningPlan } from "@qixu/contracts";

export type { LearningPlan, LearningObjective, LearningPathSegment, LearningPath } from "@qixu/contracts";

/** Domain-specific error types */
export class LearningDomainError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "LearningDomainError";
  }
}

/** Plan creation input */
export interface CreatePlanInput {
  userId: string;
  title: string;
  description: string;
  objectives: {
    title: string;
    description: string;
    category: string;
    estimatedHours: number;
  }[];
}

/** Plan generation parameters (future: LangGraph) */
export interface PlanGenerationParams {
  userId: string;
  goal: string;
  grade: string;
  subjects: string[];
  hoursPerWeek: number;
  durationWeeks: number;
}
