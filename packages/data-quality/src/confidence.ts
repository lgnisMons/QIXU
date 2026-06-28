/** Data confidence scoring — how trustworthy each data point is. */

export type ConfidenceLevel = "high" | "medium" | "low" | "unknown";

export interface ConfidenceScore {
  level: ConfidenceLevel;
  /** 0–1 numeric score */
  score: number;
  /** Why this confidence level was assigned */
  reason: string;
}

export function assessConfidence(options: {
  sourceReliability: number;
  dataFreshnessDays: number;
  verifiedCount: number;
  totalCount: number;
}): ConfidenceScore {
  const { sourceReliability, dataFreshnessDays, verifiedCount, totalCount } = options;
  const freshnessScore = Math.max(0, 1 - dataFreshnessDays / 365);
  const verifyRatio = totalCount > 0 ? verifiedCount / totalCount : 0;

  const score = sourceReliability * 0.4 + freshnessScore * 0.3 + verifyRatio * 0.3;
  const level: ConfidenceLevel = score >= 0.8 ? "high" : score >= 0.5 ? "medium" : score >= 0.3 ? "low" : "unknown";

  return {
    level,
    score: Math.round(score * 100) / 100,
    reason: `源可靠性${(sourceReliability * 100).toFixed(0)}%·数据${dataFreshnessDays}天前·验证率${(verifyRatio * 100).toFixed(0)}%`,
  };
}
