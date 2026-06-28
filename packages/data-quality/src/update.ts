/** Data update metadata — when was data last refreshed and how. */

export interface DataUpdate {
  /** Dataset identifier */
  datasetId: string;
  /** ISO 8601 — last successful update */
  lastUpdatedAt: string;
  /** ISO 8601 — next scheduled update */
  nextUpdateAt?: string;
  /** Frequency of updates */
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "manual";
  /** Update status */
  status: "up_to_date" | "pending" | "overdue" | "error";
  /** Error message if last update failed */
  errorMessage?: string;
}

export function isOutdated(update: DataUpdate): boolean {
  const now = Date.now();
  const thresholds: Record<DataUpdate["frequency"], number> = {
    daily: 86400000,
    weekly: 604800000,
    monthly: 2592000000,
    yearly: 31536000000,
    manual: Infinity,
  };
  const threshold = thresholds[update.frequency];
  return now - new Date(update.lastUpdatedAt).getTime() > threshold;
}

export function createUpdateRecord(datasetId: string, frequency: DataUpdate["frequency"] = "weekly"): DataUpdate {
  const now = new Date().toISOString();
  const next = frequency === "daily" ? addDays(now, 1) : frequency === "weekly" ? addDays(now, 7) : frequency === "monthly" ? addDays(now, 30) : frequency === "yearly" ? addDays(now, 365) : undefined;
  return { datasetId, lastUpdatedAt: now, nextUpdateAt: next, frequency, status: "up_to_date" };
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}
