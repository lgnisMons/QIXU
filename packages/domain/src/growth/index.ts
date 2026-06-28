/**
 * Growth domain — public API.
 *
 * Domain: 成长档案
 * Responsibility: Growth records, milestones, progress reports.
 */

export type { GrowthMilestone, GrowthMetric, GrowthReport, GrowthRecord, ReportGenerationInput } from "./types";
export { GrowthDomainError } from "./types";
export { addGrowthRecord, getUserRecords, addMilestone, generateGrowthReport } from "./service";
