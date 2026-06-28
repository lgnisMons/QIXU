/**
 * Growth domain contracts.
 * Pure TypeScript types — no implementation, no runtime dependency.
 */

/** A growth milestone */
export interface GrowthMilestone {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  achievedAt: string;
  evidence: string[];
}

/** A growth metric value */
export interface GrowthMetric {
  name: string;
  label: string;
  value: number;
  max: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

/** A complete growth report */
export interface GrowthReport {
  id: string;
  userId: string;
  period: {
    start: string;
    end: string;
  };
  summary: string;
  metrics: GrowthMetric[];
  milestones: GrowthMilestone[];
  highlights: string[];
  recommendations: string[];
  generatedAt: string;
}

/** A growth record entry */
export interface GrowthRecord {
  id: string;
  userId: string;
  type: "milestone" | "metric_update" | "reflection" | "achievement";
  title: string;
  description: string;
  data: Record<string, unknown>;
  createdAt: string;
}
