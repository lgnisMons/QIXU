/**
 * Learning domain contracts.
 * Pure TypeScript types — no implementation, no runtime dependency.
 */

/** A single learning objective within a plan */
export interface LearningObjective {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedHours: number;
  completed: boolean;
}

/** A complete learning plan */
export interface LearningPlan {
  id: string;
  userId: string;
  title: string;
  description: string;
  objectives: LearningObjective[];
  status: "draft" | "active" | "completed" | "paused";
  createdAt: string;
  updatedAt: string;
}

/** A learning path segment */
export interface LearningPathSegment {
  id: string;
  planId: string;
  title: string;
  description: string;
  order: number;
  objectives: LearningObjective[];
  prerequisites: string[];
}

/** A complete learning path */
export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  segments: LearningPathSegment[];
  currentSegmentIndex: number;
  createdAt: string;
}
