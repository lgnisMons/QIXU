/**
 * Assessment Report — report generation and formatting.
 *
 * Transforms raw engine output into structured report sections
 * suitable for rendering by UI components.
 *
 * All logic here; React components consume the structured output.
 */

import type { AssessmentEngineOutput } from "./types";

export interface ReportSection {
  id: string;
  title: string;
  icon: "snapshot" | "strength" | "weakness" | "growth" | "next" | "timeline";
  content: ReportContent;
}

export type ReportContent =
  | SnapshotContent
  | AnalysisContent
  | SuggestionsContent
  | NextStepContent
  | TimelineContent;

export interface SnapshotContent {
  type: "snapshot";
  items: { label: string; value: string; emphasis?: boolean }[];
}

export interface AnalysisContent {
  type: "analysis";
  items: string[];
  color: "success" | "warning" | "primary";
}

export interface SuggestionsContent {
  type: "suggestions";
  phases: {
    title: string;
    duration: string;
    focus: string[];
    description: string;
    weeklyHours: number;
  }[];
  totalDuration: string;
  estimatedImprovement: string;
}

export interface NextStepContent {
  type: "next_step";
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  tutorNote?: string;
}

export interface TimelineContent {
  type: "timeline";
  milestones: { label: string; timeframe: string; description: string }[];
}

export function generateReport(output: AssessmentEngineOutput): ReportSection[] {
  return [
    buildSnapshot(output),
    buildStrengthAnalysis(output),
    buildWeaknessAnalysis(output),
    buildGrowthSuggestions(output),
    buildNextStep(output),
    buildTimeline(output),
  ];
}

function buildSnapshot(output: AssessmentEngineOutput): ReportSection {
  const p = output.profile;
  return {
    id: "snapshot",
    title: "学习概览",
    icon: "snapshot",
    content: {
      type: "snapshot",
      items: [
        { label: "年级", value: p.grade },
        { label: "学习水平", value: p.level === "beginner" ? "初级" : p.level === "intermediate" ? "中级" : p.level === "advanced" ? "高级" : "专家级", emphasis: true },
        { label: "学习风格", value: p.learningStyle === "visual" ? "视觉型" : p.learningStyle === "auditory" ? "听觉型" : p.learningStyle === "reading" ? "读写型" : "实践型" },
        { label: "每日学习时长", value: `${p.dailyStudyHours}小时` },
        { label: "偏好学科", value: p.preferredSubject, emphasis: true },
        { label: "周学习容量", value: `${p.estimatedWeeklyCapacity}小时` },
      ],
    } as SnapshotContent,
  };
}

function buildStrengthAnalysis(output: AssessmentEngineOutput): ReportSection {
  return {
    id: "strengths",
    title: "优势分析",
    icon: "strength",
    content: {
      type: "analysis",
      items: output.strengths,
      color: "success",
    } as AnalysisContent,
  };
}

function buildWeaknessAnalysis(output: AssessmentEngineOutput): ReportSection {
  return {
    id: "weaknesses",
    title: "薄弱分析",
    icon: "weakness",
    content: {
      type: "analysis",
      items: output.weaknesses,
      color: "warning",
    } as AnalysisContent,
  };
}

function buildGrowthSuggestions(output: AssessmentEngineOutput): ReportSection {
  return {
    id: "growth",
    title: "成长建议",
    icon: "growth",
    content: {
      type: "suggestions",
      phases: output.suggestedPlan.phases,
      totalDuration: output.suggestedPlan.totalDuration,
      estimatedImprovement: output.suggestedPlan.estimatedImprovement,
    } as SuggestionsContent,
  };
}

function buildNextStep(output: AssessmentEngineOutput): ReportSection {
  return {
    id: "next",
    title: "推荐下一步",
    icon: "next",
    content: {
      type: "next_step",
      title: "开始个性化学习之旅",
      description: `基于你的学习评估结果，我们建议你从「${output.suggestedPlan.phases[0]?.title ?? "基础巩固"}」开始，逐步提升。${output.tutorSuggestion.reason ? `推荐匹配${output.tutorSuggestion.tutorStyle}导师。` : ""}`,
      actionLabel: "查看学习计划",
      actionHref: "/ai",
      tutorNote: output.tutorSuggestion.reason
        ? `导师建议方向：${output.tutorSuggestion.recommendedSubjects.join("、")}`
        : undefined,
    } as NextStepContent,
  };
}

function buildTimeline(output: AssessmentEngineOutput): ReportSection {
  const phases = output.suggestedPlan.phases;
  return {
    id: "timeline",
    title: "成长时间线",
    icon: "timeline",
    content: {
      type: "timeline",
      milestones: [
        { label: "当前", timeframe: "第0周", description: `完成${output.profile.grade}学习评估` },
        ...phases.map((p, i) => ({
          label: `${i + 1}. ${p.title}`,
          timeframe: p.duration,
          description: `${p.description} 建议每周${p.weeklyHours}小时`,
        })),
        { label: "重新评估", timeframe: "10-18周后", description: "进行第二次评估，对比成长变化" },
      ],
    } as TimelineContent,
  };
}
