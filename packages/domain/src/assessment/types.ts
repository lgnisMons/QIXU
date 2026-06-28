export type { AssessmentQuestion, AssessmentAnswer, AssessmentResult } from "@qixu/contracts";

export class AssessmentDomainError extends Error {
  constructor(message: string, public code: string) { super(message); this.name = "AssessmentDomainError"; }
}

export interface CreateAssessmentInput {
  userId: string;
  title: string;
  subject: string;
  questions: {
    text: string; type: "multiple_choice" | "open_ended" | "scale";
    options?: string[]; category: string;
    difficulty: "easy" | "medium" | "hard";
  }[];
}

export interface SubmitAnswersInput {
  assessmentId: string;
  answers: { questionId: string; answer: string | string[] }[];
}

// ---- Engine Types ----

export interface AssessmentEngineInput {
  grade: string;
  subjects: string[];
  scores: Record<string, number>;
  learningGoals: string[];
  dailyStudyHours: number;
  weakSubjects: string[];
  learningStyle: "visual" | "auditory" | "reading" | "kinesthetic";
}

export interface LearningProfile {
  grade: string;
  subjects: string[];
  dailyStudyHours: number;
  learningStyle: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  focusAreas: string[];
  estimatedWeeklyCapacity: number;
  preferredSubject: string;
}

export interface TutorSuggestion {
  recommendedSubjects: string[];
  tutorStyle: string;
  reason: string;
  availability: string;
}

export interface AssessmentEngineOutput {
  id: string;
  generatedAt: string;
  profile: LearningProfile;
  strengths: string[];
  weaknesses: string[];
  suggestedPlan: {
    title: string;
    totalDuration: string;
    phases: {
      title: string;
      duration: string;
      focus: string[];
      description: string;
      weeklyHours: number;
    }[];
    estimatedImprovement: string;
  };
  tutorSuggestion: TutorSuggestion;
  aiNotes: string[];
}
