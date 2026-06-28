export type { AssessmentQuestion, AssessmentAnswer, AssessmentResult } from "@qixu/contracts";
export class AssessmentDomainError extends Error {
  constructor(message: string, public code: string) { super(message); this.name = "AssessmentDomainError"; }
}
export interface CreateAssessmentInput { userId: string; title: string; subject: string; questions: { text: string; type: "multiple_choice" | "open_ended" | "scale"; options?: string[]; category: string; difficulty: "easy" | "medium" | "hard" }[]; }
export interface SubmitAnswersInput { assessmentId: string; answers: { questionId: string; answer: string | string[] }[]; }
