/**
 * Learning domain — mock service.
 *
 * All methods return simulated data.
 * Replace with Supabase queries + LangGraph calls in Sprint-008+.
 */

import type { LearningPlan, LearningObjective, LearningPath } from "./types";
import { generateId } from "../utils";

// ---- Mock Store ----

const mockPlans: LearningPlan[] = [];

// ---- Public API ----

export function createLearningPlan(input: {
  userId: string;
  title: string;
  description: string;
  objectives: { title: string; description: string; category: string; estimatedHours: number }[];
}): LearningPlan {
  const plan: LearningPlan = {
    id: generateId("plan"),
    userId: input.userId,
    title: input.title,
    description: input.description,
    objectives: input.objectives.map((o) => ({
      id: generateId("obj"),
      title: o.title,
      description: o.description,
      category: o.category,
      estimatedHours: o.estimatedHours,
      completed: false,
    })),
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockPlans.push(plan);
  return plan;
}

export function getLearningPlan(id: string): LearningPlan | undefined {
  return mockPlans.find((p) => p.id === id);
}

export function listUserPlans(userId: string): LearningPlan[] {
  return mockPlans.filter((p) => p.userId === userId);
}

export function activatePlan(id: string): LearningPlan | undefined {
  const plan = mockPlans.find((p) => p.id === id);
  if (plan) {
    (plan as unknown as Record<string, unknown>).status = "active";
    (plan as unknown as Record<string, unknown>).updatedAt = new Date().toISOString();
  }
  return plan;
}

export function completeObjective(planId: string, objectiveId: string): LearningObjective | undefined {
  const plan = mockPlans.find((p) => p.id === planId);
  if (!plan) return undefined;
  const obj = plan.objectives.find((o) => o.id === objectiveId);
  if (obj) {
    (obj as unknown as Record<string, unknown>).completed = true;
  }
  return obj;
}

/** Mock: generate a complete learning path */
export function generateLearningPath(_params: {
  userId: string;
  goal: string;
  grade: string;
  subjects: string[];
  hoursPerWeek: number;
  durationWeeks: number;
}): LearningPath {
  return {
    id: generateId("path"),
    userId: _params.userId,
    title: `${_params.goal} — 学习路径`,
    segments: [
      {
        id: generateId("seg"),
        planId: generateId("plan"),
        title: "基础诊断",
        description: "通过 AI 诊断确定起点",
        order: 0,
        objectives: [
          {
            id: generateId("obj"),
            title: "完成能力评估",
            description: "进行全面的学科能力测试",
            category: "评估",
            estimatedHours: 2,
            completed: false,
          },
        ],
        prerequisites: [],
      },
      {
        id: generateId("seg"),
        planId: generateId("plan"),
        title: "体系构建",
        description: "建立系统的知识框架",
        order: 1,
        objectives: [
          {
            id: generateId("obj"),
            title: "掌握核心概念",
            description: "学习各科目的基础概念体系",
            category: "学习",
            estimatedHours: _params.hoursPerWeek * 4,
            completed: false,
          },
        ],
        prerequisites: ["基础诊断"],
      },
      {
        id: generateId("seg"),
        planId: generateId("plan"),
        title: "综合提升",
        description: "跨学科综合应用",
        order: 2,
        objectives: [
          {
            id: generateId("obj"),
            title: "综合应用项目",
            description: "完成一个跨学科项目",
            category: "实践",
            estimatedHours: _params.hoursPerWeek * 2,
            completed: false,
          },
        ],
        prerequisites: ["体系构建"],
      },
    ],
    currentSegmentIndex: 0,
    createdAt: new Date().toISOString(),
  };
}
