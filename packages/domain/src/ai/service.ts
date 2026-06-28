/**
 * AI domain — mock service.
 * Simulates AI diagnostic, recommendation, and workflow operations.
 * Future: Replace with LangGraph agent calls.
 */

import type { AIRecommendation, AIDiagnostic, AIWorkflowState, DiagnosticInput, RecommendationRequest } from "./types";
import { generateId } from "../utils";

export function runDiagnostic(input: DiagnosticInput): AIDiagnostic {
  const strengths = input.responses.length > 3
    ? ["概念理解", "基础应用"]
    : ["学习兴趣", "好奇心强"];
  const weaknesses = input.responses.length > 3
    ? ["综合应用", "跨知识领域连接"]
    : ["系统化", "深度思考"];

  const recommendation: AIRecommendation = {
    id: generateId("rec"),
    userId: input.userId,
    type: "learning_path",
    title: `${input.subject} — 个性化学习建议`,
    description: `基于诊断结果，建议从基础概念巩固开始，逐步过渡到综合应用。`,
    confidence: 0.85,
    reasoning: `系统分析显示${input.subject}领域存在几个可提升维度`,
    suggestedAction: "启动「基础巩固」学习计划",
    createdAt: new Date().toISOString(),
  };

  return {
    id: generateId("diag"),
    userId: input.userId,
    subject: input.subject,
    strengths,
    weaknesses,
    overallLevel: "intermediate",
    recommendations: [recommendation],
    createdAt: new Date().toISOString(),
  };
}

export function generateRecommendations(req: RecommendationRequest): AIRecommendation[] {
  const recs: AIRecommendation[] = [
    {
      id: generateId("rec"),
      userId: req.userId,
      type: req.type,
      title: `${req.type === "learning_path" ? "学习路径" : req.type === "resource" ? "学习资源" : req.type === "tutor" ? "导师" : "主题"}推荐`,
      description: `基于「${req.context}」的智能推荐结果（模拟）`,
      confidence: 0.78,
      reasoning: `根据你的学习背景和目标分析得出`,
      suggestedAction: "查看推荐详情并选择开始",
      createdAt: new Date().toISOString(),
    },
  ];
  return recs;
}

/** Mock: simulate an AI workflow */
export function startAIWorkflow(userId: string, agent: string): AIWorkflowState {
  return { id: generateId("wf"), userId, agent, status: "processing", input: {}, output: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
}

export function completeAIWorkflow(workflow: AIWorkflowState, output: Record<string, unknown>): AIWorkflowState {
  return { ...workflow, status: "completed", output, updatedAt: new Date().toISOString() };
}
