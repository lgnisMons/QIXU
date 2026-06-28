/**
 * Assessment Engine — mock implementation.
 *
 * Generates learning profiles, strengths/weaknesses analysis,
 * suggested plans, and tutor recommendations from assessment input.
 *
 * Replace with LangGraph orchestration in Sprint-009+.
 */

import { generateId } from "../utils";
import type { AssessmentEngineInput, AssessmentEngineOutput, LearningProfile, TutorSuggestion } from "./types";

// ---- Deterministic Mock Profiles ----

const gradeProfiles: Record<string, Partial<LearningProfile>> = {
  "小学": { level: "beginner", focusAreas: ["兴趣培养", "基础习惯", "阅读能力"] },
  "初中": { level: "intermediate", focusAreas: ["知识体系", "学习方法", "思维能力"] },
  "高中": { level: "advanced", focusAreas: ["应试策略", "知识整合", "自主学习"] },
  "大学及以上": { level: "expert", focusAreas: ["专业深度", "研究能力", "职业规划"] },
};

const styleDescriptions: Record<string, string> = {
  visual: "你偏好通过图表、视频和文字材料学习，视觉化呈现能帮你更好地理解抽象概念。",
  auditory: "你偏好通过听讲、讨论和音频材料学习，口头解释和对话能帮你更好地吸收知识。",
  reading: "你偏好通过阅读和写作学习，文字材料和笔记整理是你的核心学习方法。",
  kinesthetic: "你偏好通过动手实践学习，实验、项目和实际操作能让你获得最佳学习效果。",
};

export function runAssessmentEngine(input: AssessmentEngineInput): AssessmentEngineOutput {
  const profile = buildProfile(input);
  const strengths = inferStrengths(input, profile);
  const weaknesses = inferWeaknesses(input, profile);
  const suggestedPlan = buildSuggestedPlan(input, profile, strengths, weaknesses);
  const tutorSuggestion = buildTutorSuggestion(input, profile, weaknesses);
  const aiNotes = buildAINotes(input);

  return {
    id: generateId("eng"),
    generatedAt: new Date().toISOString(),
    profile,
    strengths,
    weaknesses,
    suggestedPlan,
    tutorSuggestion,
    aiNotes,
  };
}

function buildProfile(input: AssessmentEngineInput): LearningProfile {
  const base = gradeProfiles[input.grade] ?? gradeProfiles["初中"]!;
  return {
    grade: input.grade,
    subjects: input.subjects,
    dailyStudyHours: input.dailyStudyHours,
    learningStyle: input.learningStyle,
    level: base.level!,
    focusAreas: base.focusAreas ?? [],
    estimatedWeeklyCapacity: input.dailyStudyHours * 7,
    preferredSubject: input.subjects[0] ?? "综合",
  };
}

function inferStrengths(input: AssessmentEngineInput, profile: LearningProfile): string[] {
  const strengths: string[] = [];

  // High score subjects
  const topSubjects = Object.entries(input.scores)
    .filter(([, score]) => score >= 80)
    .map(([subject]) => subject);
  if (topSubjects.length > 0) {
    strengths.push(`${topSubjects.join("、")}基础扎实`);
  }

  // Consistent learner
  if (input.dailyStudyHours >= 2) {
    strengths.push("学习投入度高，具备持续学习的习惯");
  }

  // Clear goals
  if (input.learningGoals.length >= 2) {
    strengths.push("学习目标明确，方向感强");
  }

  // Learning style awareness
  strengths.push(`已形成${styleDescriptions[input.learningStyle]?.slice(0, 20) ?? "个性化"}学习风格`);

  // Fallback
  if (strengths.length === 0) {
    strengths.push("学习主动性良好");
    strengths.push("具备基础学习能力");
  }

  return strengths;
}

function inferWeaknesses(input: AssessmentEngineInput, profile: LearningProfile): string[] {
  const weaknesses: string[] = [];

  const weakSubjects = Object.entries(input.scores)
    .filter(([, score]) => score < 60)
    .map(([subject]) => subject);
  const midSubjects = Object.entries(input.scores)
    .filter(([, score]) => score >= 60 && score < 80)
    .map(([subject]) => subject);

  if (weakSubjects.length > 0) {
    weaknesses.push(`${weakSubjects.join("、")}需要重点加强`);
  }
  if (midSubjects.length > 0) {
    weaknesses.push(`${midSubjects.join("、")}存在提升空间`);
  }

  if (input.weakSubjects.length > 0) {
    weaknesses.push(`自我认知清晰：${input.weakSubjects.join("、")}方面希望提升`);
  }

  if (input.dailyStudyHours < 1) {
    weaknesses.push("学习时间偏少，建议增加每日投入");
  }

  // Knowledge integration for advanced levels
  if (profile.level === "advanced" || profile.level === "expert") {
    weaknesses.push("跨知识点综合应用能力有待加强");
  }

  if (weaknesses.length === 0) {
    weaknesses.push("可进一步挑战更高难度内容");
  }

  return weaknesses;
}

function buildSuggestedPlan(
  input: AssessmentEngineInput,
  profile: LearningProfile,
  strengths: string[],
  weaknesses: string[]
): AssessmentEngineOutput["suggestedPlan"] {
  const phases: AssessmentEngineOutput["suggestedPlan"]["phases"] = [];

  // Phase 1: Foundation
  const weakList = Object.entries(input.scores)
    .filter(([, s]) => s < 60)
    .map(([subj]) => subj);
  phases.push({
    title: "基础巩固阶段",
    duration: "2-4周",
    focus: weakList.length > 0 ? weakList : input.subjects.slice(0, 2),
    description: weakList.length > 0
      ? `重点加强${weakList.join("、")}的基础概念和核心知识点，建立扎实的学科根基。`
      : "巩固已有知识基础，查漏补缺。",
    weeklyHours: Math.round(input.dailyStudyHours * 5),
  });

  // Phase 2: Improvement
  const midList = Object.entries(input.scores)
    .filter(([, s]) => s >= 60 && s < 80)
    .map(([subj]) => subj);
  phases.push({
    title: "能力提升阶段",
    duration: "4-6周",
    focus: midList.length > 0 ? midList : input.subjects,
    description: "系统提升知识应用能力，加强跨知识点连接，培养综合解题思维。",
    weeklyHours: Math.round(input.dailyStudyHours * 6),
  });

  // Phase 3: Mastery
  phases.push({
    title: "综合突破阶段",
    duration: "4-8周",
    focus: input.subjects,
    description: input.learningGoals.length > 0
      ? `围绕「${input.learningGoals.join("、")}」目标，进行综合训练和实战应用。`
      : "进行综合训练，挑战更高难度内容，实现学习突破。",
    weeklyHours: Math.round(input.dailyStudyHours * 7),
  });

  return {
    title: `${input.grade} — 个性化学习计划`,
    totalDuration: "10-18周",
    phases,
    estimatedImprovement: "预计2-3个月内可见显著进步",
  };
}

function buildTutorSuggestion(
  input: AssessmentEngineInput,
  profile: LearningProfile,
  weaknesses: string[]
): TutorSuggestion {
  const weakSubjects = Object.entries(input.scores)
    .filter(([, s]) => s < 70)
    .map(([subj]) => subj);

  return {
    recommendedSubjects: weakSubjects.length > 0 ? weakSubjects : input.subjects.slice(0, 2),
    tutorStyle: input.learningStyle === "kinesthetic" ? "实践导向型" : "引导启发型",
    reason: weaknesses.slice(0, 2).join("；"),
    availability: "mock_available",
  };
}

function buildAINotes(input: AssessmentEngineInput): string[] {
  return [
    "此评估基于模拟引擎生成，非真实 AI 分析",
    "未来版本将集成 LangGraph 智能体进行深度诊断",
    "建议每3个月重新评估以跟踪成长变化",
    `数据输入：${input.subjects.length}个学科，${input.learningGoals.length}个目标`,
  ];
}
