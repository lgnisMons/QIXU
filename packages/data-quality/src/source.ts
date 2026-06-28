/**
 * Data source metadata.
 * Every dataset must declare its provenance.
 */

export type SourceType = "official" | "crawled" | "user_submitted" | "ai_generated" | "manual";

export interface DataSource {
  /** Human-readable label */
  label: string;
  /** Source type */
  type: SourceType;
  /** URL of origin (if applicable) */
  url?: string;
  /** Organization that published this data */
  organization?: string;
  /** ISO 8601 — when data was originally published */
  publishedAt?: string;
  /** ISO 8601 — when data was ingested into QIXU */
  ingestedAt: string;
  /** How data was acquired */
  method: "api" | "crawl" | "manual_entry" | "archive" | "user_upload";
  /** Reliability rating 0–1 */
  reliability: number;
}

export function createSource(
  label: string,
  type: SourceType = "crawled",
  reliability = 0.8,
): DataSource {
  return { label, type, reliability, method: "crawl", ingestedAt: new Date().toISOString() };
}
