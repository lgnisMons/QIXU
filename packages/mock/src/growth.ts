/**
 * Mock growth data — typed interfaces only, no JSON.
 * Replace with Supabase queries in Sprint-007.
 */

export interface GrowthStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: "compass" | "layers" | "rocket";
  agentStateKey?: string;
}

export const mockGrowthStages: GrowthStage[] = [
  {
    id: "enlightenment",
    title: "启蒙",
    subtitle: "Enlightenment",
    description: "发现兴趣所在，认识自我潜能。通过 AI 智能诊断，找到最适合你的成长起点。",
    icon: "compass",
    agentStateKey: "enlightenment_stage",
  },
  {
    id: "sequence",
    title: "序章",
    subtitle: "Sequence",
    description: "构建知识体系，建立学习节奏。在导师引导下，形成属于自己的成长序列。",
    icon: "layers",
    agentStateKey: "sequence_stage",
  },
  {
    id: "future",
    title: "未来",
    subtitle: "Future",
    description: "自由探索，实现潜能。从被动学习走向主动创造，开创无限可能的未来。",
    icon: "rocket",
    agentStateKey: "future_stage",
  },
];

export interface GrowthRecord {
  id: string;
  userId: string;
  stageId: string;
  progress: number;
  achievements: string[];
  updatedAt: string;
}

export const mockGrowthRecords: GrowthRecord[] = [];
