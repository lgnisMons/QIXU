import type { GrowthReport, GrowthRecord, GrowthMilestone, ReportGenerationInput } from "./types";
import { generateId } from "../utils";

const mockRecords: GrowthRecord[] = [];
const mockMilestones: GrowthMilestone[] = [];

export function addGrowthRecord(input: { userId: string; type: GrowthRecord["type"]; title: string; description: string; data?: Record<string, unknown> }): GrowthRecord {
  const r: GrowthRecord = { id: generateId("gr"), userId: input.userId, type: input.type, title: input.title, description: input.description, data: input.data ?? {}, createdAt: new Date().toISOString() };
  mockRecords.push(r); return r;
}

export function getUserRecords(userId: string): GrowthRecord[] { return mockRecords.filter((r) => r.userId === userId); }

export function addMilestone(input: { userId: string; title: string; description: string; category: string; evidence: string[] }): GrowthMilestone {
  const m: GrowthMilestone = { ...input, id: generateId("ms"), achievedAt: new Date().toISOString() };
  mockMilestones.push(m); return m;
}

export function generateGrowthReport(input: ReportGenerationInput): GrowthReport {
  const records = mockRecords.filter((r) => r.userId === input.userId);
  const milestones = mockMilestones.filter((m) => m.userId === input.userId);
  return {
    id: generateId("rpt"), userId: input.userId,
    period: { start: input.periodStart, end: input.periodEnd },
    summary: `在${input.periodStart}至${input.periodEnd}期间，你完成了${records.length}次成长记录，达成${milestones.length}个里程碑。`,
    metrics: [
      { name: "learningHours", label: "学习时长", value: records.length * 2, max: 100, unit: "小时", trend: "up" },
      { name: "objectivesCompleted", label: "目标达成", value: milestones.length, max: 50, unit: "个", trend: "up" },
      { name: "consistency", label: "学习连续性", value: 75, max: 100, unit: "%", trend: "stable" },
    ],
    milestones, highlights: milestones.map((m) => m.title),
    recommendations: ["继续保持当前学习节奏", "尝试增加跨学科连接"],
    generatedAt: new Date().toISOString(),
  };
}
