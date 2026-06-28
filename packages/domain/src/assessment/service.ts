import type { AssessmentResult, CreateAssessmentInput, SubmitAnswersInput } from "./types";
import { generateId } from "../utils";

const mockResults: AssessmentResult[] = [];

export function createAssessment(input: CreateAssessmentInput): AssessmentResult {
  const r: AssessmentResult = {
    id: generateId("asmt"), userId: input.userId, title: input.title, subject: input.subject,
    questions: input.questions.map((q) => ({ ...q, id: generateId("q") })),
    answers: [], totalScore: 0, maxScore: input.questions.length * 10,
    strengths: [], weaknesses: [], summary: "", recommendations: [], completedAt: "",
  };
  mockResults.push(r); return r;
}

export function submitAnswers(input: SubmitAnswersInput): AssessmentResult | undefined {
  const result = mockResults.find((r) => r.id === input.assessmentId);
  if (!result) return undefined;

  const scored = result.questions.map((q) => {
    const answer = input.answers.find((a) => a.questionId === q.id);
    const score = answer ? Math.round(5 + Math.random() * 5) : 0;
    const feedback = score >= 8 ? "掌握良好" : score >= 5 ? "需要巩固" : "需要重点学习";
    return { questionId: q.id, answer: answer?.answer ?? "", score, feedback };
  });

  const totalScore = scored.reduce((sum, a) => sum + (a.score ?? 0), 0);
  const correctIds = scored.filter((a) => (a.score ?? 0) >= 7).map((a) => a.questionId);
  const incorrectIds = scored.filter((a) => (a.score ?? 0) < 7).map((a) => a.questionId);

  const updated: AssessmentResult = {
    ...result,
    answers: scored,
    totalScore, maxScore: result.maxScore,
    strengths: correctIds.map((id) => result.questions.find((q) => q.id === id)?.category ?? "").filter(Boolean),
    weaknesses: incorrectIds.map((id) => result.questions.find((q) => q.id === id)?.category ?? "").filter(Boolean),
    summary: `总分 ${totalScore}/${result.maxScore}。${correctIds.length} 项掌握良好，${incorrectIds.length} 项需要提升。`,
    recommendations: incorrectIds.length > 0
      ? ["建议回顾薄弱章节", "利用 AI 助手进行针对性练习"]
      : ["继续保持当前水平", "可以挑战更高难度"],
    completedAt: new Date().toISOString(),
  };

  Object.assign(result, updated);
  return result;
}

export function getAssessmentResult(id: string): AssessmentResult | undefined { return mockResults.find((r) => r.id === id); }
export function listUserAssessments(userId: string): AssessmentResult[] { return mockResults.filter((r) => r.userId === userId); }
