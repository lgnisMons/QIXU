/**
 * @qixu/data-quality — Data Quality Layer
 *
 * Prepares future official data ingestion by ensuring every dataset supports:
 * - source provenance tracking
 * - validation rules
 * - version control
 * - confidence scoring
 * - update scheduling
 */

export type { SourceType, DataSource } from "./source";
export { createSource } from "./source";

export type { ValidationResult, ValidationError, ValidationWarning } from "./validator";
export { validateDataset } from "./validator";

export type { DataVersion } from "./version";
export { createVersion, compareVersions } from "./version";

export type { ConfidenceLevel, ConfidenceScore } from "./confidence";
export { assessConfidence } from "./confidence";

export type { DataUpdate } from "./update";
export { isOutdated, createUpdateRecord } from "./update";
