/**
 * @qixu/data-pipeline — Core Types
 *
 * Official Data Pipeline for the QIXU Admission Recommendation System.
 *
 * Pipeline stages:
 *   Raw Data → DataSource.fetch() → Normalize → Validate → Confidence Score → Store
 *                                                                              ↓
 *                                                              Recommendation Engine (read-only)
 *
 * Key principles:
 * - Every record carries full provenance metadata (source, collectedAt, version, confidence)
 * - Data is managed by academic year (2023, 2024, 2025...)
 * - Only validated data is exposed to the recommendation engine
 * - Data sources are pluggable via the DataSource adapter interface
 */

import type { DataSource as DQDataSource, ConfidenceScore } from "@qixu/data-quality";
import type {
  University,
  Major,
  AdmissionRecord,
  SubjectType,
  UniversityTier,
  UniversityType,
  MajorCategory,
} from "@qixu/domain/knowledge";

// ---------------------------------------------------------------------------
// Pipeline Status
// ---------------------------------------------------------------------------

/** Status of a data record in the pipeline */
export type PipelineStatus =
  | "raw" // Just collected, not yet processed
  | "normalized" // Standardized to domain types
  | "validated" // Passed validation
  | "rejected" // Failed validation
  | "published"; // Available to recommendation engine

// ---------------------------------------------------------------------------
// Provenance & Metadata (attached to every record)
// ---------------------------------------------------------------------------

/**
 * Provenance metadata that MUST be attached to every data record
 * entering the pipeline. This satisfies the requirement:
 * - source (来源)
 * - collectedAt (采集时间)
 * - academicYear (招生年度)
 * - updatedAt (最后更新时间)
 * - confidence (可信度)
 * - version (版本号)
 */
export interface Provenance {
  /** Data source descriptor */
  source: DQDataSource;
  /** ISO 8601 — when data was collected/ingested */
  collectedAt: string;
  /** Academic year this data belongs to (e.g., 2025) */
  academicYear: number;
  /** ISO 8601 — last update time */
  updatedAt: string;
  /** Confidence score assessment */
  confidence: ConfidenceScore;
  /** Semantic version tag for this data batch */
  version: string;
}

// ---------------------------------------------------------------------------
// Envelope Types (raw → processed)
// ---------------------------------------------------------------------------

/** Raw data as fetched from a source, before normalization */
export interface RawDataBatch<T = unknown> {
  /** Unique batch ID */
  id: string;
  /** Academic year */
  academicYear: number;
  /** Source descriptor */
  source: DQDataSource;
  /** Collected at timestamp */
  collectedAt: string;
  /** Raw records (shape depends on source) */
  records: T[];
}

/** A normalized record wrapper — domain type + provenance */
export interface ValidatedRecord<T> {
  /** The validated domain entity */
  data: T;
  /** Full provenance metadata */
  provenance: Provenance;
  /** Pipeline status */
  status: PipelineStatus;
  /** Validation warnings (if any) */
  warnings: string[];
}

/** A batch that has completed the full pipeline */
export interface ProcessedBatch<T> {
  /** Batch ID */
  id: string;
  /** Academic year */
  academicYear: number;
  /** Version string (e.g., "2025.1") */
  version: string;
  /** Source label */
  sourceLabel: string;
  /** Validated records ready for use */
  validRecords: ValidatedRecord<T>[];
  /** Records that failed validation */
  rejectedRecords: { data: T; errors: string[] }[];
  /** Total counts */
  stats: {
    total: number;
    valid: number;
    rejected: number;
    warnings: number;
  };
  /** Processing timestamp */
  processedAt: string;
}

// ---------------------------------------------------------------------------
// Domain-specific types for Admission Data
// ---------------------------------------------------------------------------

/** Raw admission record shape from any source (normalized form) */
export interface NormalizedAdmissionInput {
  universityName: string;
  province: string;
  city: string;
  majorName: string;
  subjectType: SubjectType;
  year: number;
  lowestScore: number;
  lowestRank: number;
  quota?: number;
  tuition?: number;
  /** Optional extra fields from source */
  extras?: Record<string, unknown>;
}

/** Raw university input shape */
export interface NormalizedUniversityInput {
  name: string;
  province: string;
  city: string;
  tier?: UniversityTier;
  type?: UniversityType;
  tags?: string[];
  website?: string;
  description?: string;
}

/** Raw major input shape */
export interface NormalizedMajorInput {
  name: string;
  category: MajorCategory;
  employmentDirection?: string[];
  graduateDirection?: string[];
  popularity?: number;
}

// ---------------------------------------------------------------------------
// Data Source Adapter Interface
// ---------------------------------------------------------------------------

/**
 * Unified data source adapter interface.
 * Implement this to connect any data source (official websites,
 * Excel imports, manual entry, API integrations, etc.)
 *
 * The pipeline never depends on a specific source implementation.
 */
export interface DataSourceAdapter<TRaw = unknown> {
  /** Unique source identifier (e.g., "official-edu-gd", "manual-import-2025") */
  readonly id: string;
  /** Human-readable label */
  readonly label: string;
  /** Source type category */
  readonly sourceType: "official" | "crawled" | "manual" | "api" | "import";
  /** Default reliability 0-1 */
  readonly reliability: number;

  /**
   * Fetch raw data for a given academic year.
   * Returns raw records in the source's native format.
   */
  fetch(options: {
    academicYear: number;
    province?: string;
    signal?: AbortSignal;
  }): Promise<TRaw[]>;

  /**
   * Normalize raw records into standard input shapes.
   * This converts source-specific field names/units into the
   * pipeline's normalized format.
   */
  normalize(
    raw: TRaw[],
    meta: { academicYear: number }
  ): {
    universities: NormalizedUniversityInput[];
    majors: NormalizedMajorInput[];
    admissions: NormalizedAdmissionInput[];
  };
}

// ---------------------------------------------------------------------------
// Pipeline Result
// ---------------------------------------------------------------------------

/** Result of running a batch through the full pipeline */
export interface PipelineResult {
  academicYear: number;
  version: string;
  source: string;
  universities: ProcessedBatch<University>;
  majors: ProcessedBatch<Major>;
  admissions: ProcessedBatch<AdmissionRecord>;
  /** Whether this batch is published (available to recommendation engine) */
  published: boolean;
  processedAt: string;
}

// ---------------------------------------------------------------------------
// Reader Interface (Recommendation Engine)
// ---------------------------------------------------------------------------

/** Read-only query options for the recommendation engine */
export interface ReadQuery {
  academicYear?: number;
  province?: string;
  subjectType?: SubjectType;
  /** Only return data with at least this confidence level */
  minConfidence?: "high" | "medium" | "low";
  /** Only include published/validated data */
  validatedOnly?: boolean;
}

/** Dataset summary for a given academic year */
export interface DatasetSummary {
  academicYear: number;
  version: string;
  universityCount: number;
  majorCount: number;
  admissionCount: number;
  sources: string[];
  lastUpdated: string;
  confidenceBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
  status: "draft" | "published" | "stale";
}
