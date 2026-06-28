/**
 * @qixu/data-pipeline — Official Data Pipeline
 *
 * Production-ready data pipeline for the QIXU Admission Recommendation System.
 *
 * Architecture:
 *
 *   DataSource Adapter (pluggable)
 *         ↓
 *   Normalizer (standardize field names, units, formats)
 *         ↓
 *   Validator (Zod schemas + business rules)
 *         ↓
 *   Confidence Scoring (source reliability + freshness + verification rate)
 *         ↓
 *   Repository (year-based storage with versioning)
 *         ↓
 *   DataReader (read-only, validated-only access for recommendation engine)
 *
 * Quick start:
 * ```ts
 * import { createPipeline, createDataReader, BuiltInAdapter } from "@qixu/data-pipeline";
 *
 * const pipeline = createPipeline();
 * await pipeline.ingestFrom(new BuiltInAdapter(), { academicYear: 2025, autoPublish: true });
 *
 * const reader = createDataReader(pipeline.repository);
 * const records = reader.getAdmissionRecords(2025, { province: "广东" });
 * ```
 */

// Types
export type {
  DataSourceAdapter,
  PipelineResult,
  PipelineStatus,
  Provenance,
  RawDataBatch,
  ValidatedRecord,
  ProcessedBatch,
  NormalizedAdmissionInput,
  NormalizedUniversityInput,
  NormalizedMajorInput,
  ReadQuery,
  DatasetSummary,
} from "./types";

// Schemas
export {
  NormalizedUniversityInputSchema,
  NormalizedMajorInputSchema,
  NormalizedAdmissionInputSchema,
  ProvenanceSchema,
} from "./schemas";

// Adapters
export { BuiltInAdapter } from "./adapters";
export { AdapterRegistry, createAdapterRegistry } from "./adapters";

// Pipeline
export { runPipeline } from "./pipeline";
export type { PipelineRunOptions } from "./pipeline";
export { validateBatch } from "./pipeline";
export { normalizeEntities } from "./pipeline";

// Repository
export { DataRepository, defaultRepository } from "./repository";
export type { YearData } from "./repository";

// Reader (Recommendation Engine interface)
export { DataReader, createDataReader } from "./reader";
export type { ReadResult } from "./reader";

// Bootstrap helper
export { createPipeline, type QIXUPipeline } from "./bootstrap";
