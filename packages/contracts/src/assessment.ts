/**
 * Assessment domain contracts.
 * Pure TypeScript types — no implementation, no runtime dependency.
 */

/** An assessment question */
export interface AssessmentQuestion {
  id: string;
  text: string;
  type: "multiple_choice" | "open_ended" | "scale";
  options?: string[];
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

/** A scored answer */
export interface AssessmentAnswer {
  questionId: string;
  answer: string | string[];
  score?: number;
  feedback?: string;
}

/** A complete assessment result */
export interface AssessmentResult {
  id: string;
  userId: string;
  title: string;
  subject: string;
  questions: AssessmentQuestion[];
  answers: AssessmentAnswer[];
  totalScore: number;
  maxScore: number;
  strengths: string[];
  weaknesses: string[];
  summary: string;
  recommendations: string[];
  completedAt: string;
}
