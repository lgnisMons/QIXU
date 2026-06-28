/**
 * Learning domain — public API.
 *
 * Domain: 学习规划
 * Responsibility: Learning plan creation, objective tracking, path generation.
 */

export type {
  LearningPlan,
  LearningObjective,
  LearningPathSegment,
  LearningPath,
  CreatePlanInput,
  PlanGenerationParams,
} from "./types";
export { LearningDomainError } from "./types";

export {
  createLearningPlan,
  getLearningPlan,
  listUserPlans,
  activatePlan,
  completeObjective,
  generateLearningPath,
} from "./service";
