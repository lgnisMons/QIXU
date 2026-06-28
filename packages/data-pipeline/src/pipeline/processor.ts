/**
 * Pipeline Processor — orchestrates the full data pipeline:
 * fetch → normalize → validate → score confidence → produce processed batch
 */

import { createSource, assessConfidence, createVersion } from "@qixu/data-quality";
import type { DataSourceAdapter, PipelineResult, Provenance, ProcessedBatch, ValidatedRecord } from "../types";
import type { University, Major, AdmissionRecord } from "@qixu/domain/knowledge";
import { normalizeEntities } from "./normalizer";
import { validateBatch } from "./validator";

let batchCounter = 0;

function generateBatchId(): string {
  batchCounter++;
  const ts = Date.now().toString(36);
  return `batch_${ts}${batchCounter}`;
}

export interface PipelineRunOptions {
  adapter: DataSourceAdapter;
  academicYear: number;
  province?: string;
  /** Version override (e.g., "2025.2"). Auto-generated if not provided. */
  version?: string;
  /** Whether to auto-publish the batch after processing */
  autoPublish?: boolean;
}

/**
 * Run the full data pipeline for a given adapter and academic year.
 */
export async function runPipeline(options: PipelineRunOptions): Promise<PipelineResult> {
  const { adapter, academicYear, province, autoPublish = false } = options;
  const collectedAt = new Date().toISOString();
  const batchId = generateBatchId();

  // 1. Fetch raw data
  const raw = await adapter.fetch({ academicYear, province });

  // 2. Normalize
  const normalized = adapter.normalize(raw, { academicYear });

  // 3. Entity normalization (ID generation, deduplication, reference resolution)
  const {
    universities: normalizedUnis,
    majors: normalizedMajors,
    admissions: normalizedAdms,
    warnings: normalizeWarnings,
  } = normalizeEntities(normalized.universities, normalized.majors, normalized.admissions);

  // 4. Build provenance
  const source = createSource(
    adapter.label,
    adapter.sourceType === "official" ? "official" : adapter.sourceType === "manual" ? "manual" : adapter.sourceType === "api" ? "official" : "crawled",
    adapter.reliability
  );
  source.method = adapter.sourceType === "api" ? "api" : adapter.sourceType === "manual" ? "manual_entry" : "crawl";
  if (province) source.organization = `${province}教育数据`;

  // 5. Validate
  const validation = validateBatch(normalizedUnis, normalizedMajors, normalizedAdms, {
    source,
    collectedAt,
    academicYear,
    updatedAt: collectedAt,
    confidence: { level: "medium", score: adapter.reliability, reason: "pre-validation" },
    version: options.version ?? `${academicYear}.1`,
  });

  // 6. Assess confidence for valid records
  const daysSincePublication = 0; // Just collected
  const validUnis = attachConfidence(validation.universities.valid, source, daysSincePublication, normalizedUnis.length);
  const validMajs = attachConfidence(validation.majors.valid, source, daysSincePublication, normalizedMajors.length);
  const validAdms = attachConfidence(validation.admissions.valid, source, daysSincePublication, normalizedAdms.length);

  // 7. Build provenance with final confidence
  const finalProvenance: Provenance = {
    source,
    collectedAt,
    academicYear,
    updatedAt: collectedAt,
    confidence: assessConfidence({
      sourceReliability: adapter.reliability,
      dataFreshnessDays: daysSincePublication,
      verifiedCount: validAdms.length,
      totalCount: normalizedAdms.length,
    }),
    version: options.version ?? `${academicYear}.1`,
  };

  // Update provenance on all valid records
  for (const r of [...validUnis, ...validMajs, ...validAdms]) {
    r.provenance = finalProvenance;
    r.status = autoPublish ? "published" : "validated";
  }

  // 8. Assemble processed batches
  const version = createVersion(
    finalProvenance.version,
    `${adapter.label} - ${academicYear}${province ? ` ${province}` : ""} 录取数据`,
    validAdms.length
  );

  const uniBatch: ProcessedBatch<University> = {
    id: batchId + "_uni",
    academicYear,
    version: version.version,
    sourceLabel: adapter.label,
    validRecords: validUnis,
    rejectedRecords: validation.universities.rejected.map((r) => ({
      data: r.data.data,
      errors: r.errors,
    })),
    stats: {
      total: normalizedUnis.length,
      valid: validUnis.length,
      rejected: validation.universities.rejected.length,
      warnings: normalizeWarnings.filter((w) => w.includes("大学")).length,
    },
    processedAt: collectedAt,
  };

  const majBatch: ProcessedBatch<Major> = {
    id: batchId + "_maj",
    academicYear,
    version: version.version,
    sourceLabel: adapter.label,
    validRecords: validMajs,
    rejectedRecords: validation.majors.rejected.map((r) => ({
      data: r.data.data,
      errors: r.errors,
    })),
    stats: {
      total: normalizedMajors.length,
      valid: validMajs.length,
      rejected: validation.majors.rejected.length,
      warnings: normalizeWarnings.filter((w) => w.includes("专业")).length,
    },
    processedAt: collectedAt,
  };

  const admBatch: ProcessedBatch<AdmissionRecord> = {
    id: batchId + "_adm",
    academicYear,
    version: version.version,
    sourceLabel: adapter.label,
    validRecords: validAdms,
    rejectedRecords: validation.admissions.rejected.map((r) => ({
      data: r.data.data,
      errors: r.errors,
    })),
    stats: {
      total: normalizedAdms.length,
      valid: validAdms.length,
      rejected: validation.admissions.rejected.length,
      warnings: validation.admissions.warnings.length,
    },
    processedAt: collectedAt,
  };

  return {
    academicYear,
    version: version.version,
    source: adapter.label,
    universities: uniBatch,
    majors: majBatch,
    admissions: admBatch,
    published: autoPublish,
    processedAt: collectedAt,
  };
}

/** Attach initial confidence scores to validated records */
function attachConfidence<T>(
  records: ValidatedRecord<T>[],
  _source: ReturnType<typeof createSource>,
  _freshnessDays: number,
  _totalCount: number
): ValidatedRecord<T>[] {
  return records.map((r) => ({
    ...r,
    status: "validated" as const,
  }));
}
