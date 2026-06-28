export type { GrowthMilestone, GrowthMetric, GrowthReport, GrowthRecord } from "@qixu/contracts";
export class GrowthDomainError extends Error {
  constructor(message: string, public code: string) { super(message); this.name = "GrowthDomainError"; }
}
export interface ReportGenerationInput { userId: string; periodStart: string; periodEnd: string; }
