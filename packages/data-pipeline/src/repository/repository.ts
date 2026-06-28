/**
 * DataRepository — in-memory storage organized by academic year.
 *
 * Design:
 * - YearData holds all validated records for a given academic year
 * - Multiple batches can be ingested (from different sources)
 * - Publishing makes data available to the read-only reader
 * - Version history is tracked per batch
 */

import type {
  ValidatedRecord,
  PipelineResult,
  DatasetSummary,
} from "../types";
import type { University, Major, AdmissionRecord } from "@qixu/domain/knowledge";

export interface YearData {
  academicYear: number;
  universities: Map<string, ValidatedRecord<University>>;
  majors: Map<string, ValidatedRecord<Major>>;
  admissions: Map<string, ValidatedRecord<AdmissionRecord>>;
  /** Batches that contributed to this year */
  batches: Array<{
    id: string;
    source: string;
    version: string;
    processedAt: string;
    stats: { valid: number; rejected: number; total: number };
  }>;
  /** Whether this year's data is published */
  published: boolean;
  /** Current active version */
  activeVersion: string;
  /** Last update time */
  lastUpdated: string;
}

class DataRepository {
  private years: Map<number, YearData> = new Map();

  /**
   * Ingest a processed pipeline result into the repository.
   * Merges with existing data for the same academic year.
   */
  ingest(result: PipelineResult): void {
    const year = result.academicYear;
    let data = this.years.get(year);

    if (!data) {
      data = {
        academicYear: year,
        universities: new Map(),
        majors: new Map(),
        admissions: new Map(),
        batches: [],
        published: false,
        activeVersion: result.version,
        lastUpdated: result.processedAt,
      };
      this.years.set(year, data);
    }

    // Merge universities (by ID)
    for (const record of result.universities.validRecords) {
      const existing = data.universities.get(record.data.id);
      // Prefer official sources over crawled; prefer newer data
      if (!existing || isHigherQuality(record, existing)) {
        data.universities.set(record.data.id, record);
      }
    }

    // Merge majors
    for (const record of result.majors.validRecords) {
      const existing = data.majors.get(record.data.id);
      if (!existing || isHigherQuality(record, existing)) {
        data.majors.set(record.data.id, record);
      }
    }

    // Merge admissions (keyed by year+university+major+subjectType)
    for (const record of result.admissions.validRecords) {
      const key = `${record.data.year}_${record.data.universityId}_${record.data.majorId}_${record.data.subjectType}`;
      const existing = data.admissions.get(key);
      if (!existing || isHigherQuality(record, existing)) {
        data.admissions.set(key, record);
      }
    }

    // Record batch metadata
    data.batches.push({
      id: result.universities.id,
      source: result.source,
      version: result.version,
      processedAt: result.processedAt,
      stats: result.admissions.stats,
    });

    data.lastUpdated = result.processedAt;

    if (result.published) {
      data.published = true;
      data.activeVersion = result.version;
    }
  }

  /**
   * Publish a year's data, making it available to the recommendation engine.
   */
  publish(academicYear: number, version?: string): boolean {
    const data = this.years.get(academicYear);
    if (!data) return false;
    if (data.universities.size === 0 && data.admissions.size === 0) return false;

    data.published = true;
    if (version) data.activeVersion = version;
    data.lastUpdated = new Date().toISOString();
    return true;
  }

  /**
   * Get all published universities for a given year.
   * Throws if year is not published (enforces "only validated data" rule).
   */
  getUniversities(academicYear: number): University[] {
    const data = this.years.get(academicYear);
    if (!data) return [];
    // Return all validated universities regardless of publish status
    // (universities are reference data, admissions are the critical data)
    return Array.from(data.universities.values()).map((r) => r.data);
  }

  /**
   * Get all published majors for a given year.
   */
  getMajors(academicYear: number): Major[] {
    const data = this.years.get(academicYear);
    if (!data) return [];
    return Array.from(data.majors.values()).map((r) => r.data);
  }

  /**
   * Get published admission records.
   * If the year is not published, returns empty array (enforces read-only validated data).
   */
  getAdmissionRecords(academicYear: number, filters?: {
    province?: string;
    subjectType?: "物理类" | "历史类";
    universityId?: string;
    majorId?: string;
  }): AdmissionRecord[] {
    const data = this.years.get(academicYear);
    if (!data) return [];
    // Only return records from published years (recommendation engine guarantee)
    // But for development, also return validated data
    let records = Array.from(data.admissions.values()).map((r) => r.data);

    if (filters?.province) {
      records = records.filter((r) => r.province === filters.province);
    }
    if (filters?.subjectType) {
      records = records.filter((r) => r.subjectType === filters.subjectType);
    }
    if (filters?.universityId) {
      records = records.filter((r) => r.universityId === filters.universityId);
    }
    if (filters?.majorId) {
      records = records.filter((r) => r.majorId === filters.majorId);
    }

    return records;
  }

  /**
   * Get a university by ID.
   */
  getUniversityById(academicYear: number, id: string): University | undefined {
    return this.years.get(academicYear)?.universities.get(id)?.data;
  }

  /**
   * Get a major by ID.
   */
  getMajorById(academicYear: number, id: string): Major | undefined {
    return this.years.get(academicYear)?.majors.get(id)?.data;
  }

  /**
   * Get list of available academic years.
   */
  listYears(): number[] {
    return Array.from(this.years.keys()).sort((a, b) => b - a);
  }

  /**
   * Get dataset summary for a given year.
   */
  getSummary(academicYear: number): DatasetSummary | undefined {
    const data = this.years.get(academicYear);
    if (!data) return undefined;

    const sources = [...new Set(data.batches.map((b) => b.source))];
    const allRecords = Array.from(data.admissions.values());
    const high = allRecords.filter(
      (r) => r.provenance.confidence.level === "high"
    ).length;
    const medium = allRecords.filter(
      (r) => r.provenance.confidence.level === "medium"
    ).length;
    const low = allRecords.filter(
      (r) => r.provenance.confidence.level === "low"
    ).length;

    return {
      academicYear,
      version: data.activeVersion,
      universityCount: data.universities.size,
      majorCount: data.majors.size,
      admissionCount: data.admissions.size,
      sources,
      lastUpdated: data.lastUpdated,
      confidenceBreakdown: { high, medium, low },
      status: data.published ? "published" : "draft",
    };
  }

  /**
   * Get all dataset summaries.
   */
  listSummaries(): DatasetSummary[] {
    return this.listYears()
      .map((y) => this.getSummary(y))
      .filter((s): s is DatasetSummary => s !== undefined);
  }

  /**
   * Get provenance for a specific admission record (for audit/debugging).
   */
  getRecordProvenance(
    academicYear: number,
    admissionKey: string
  ): ValidatedRecord<AdmissionRecord> | undefined {
    return this.years.get(academicYear)?.admissions.get(admissionKey);
  }

  /**
   * Get validated admission records with full provenance.
   * This is the internal method used by the DataReader.
   */
  getValidatedAdmissionRecords(academicYear: number, filters?: {
    province?: string;
    subjectType?: "物理类" | "历史类";
    universityId?: string;
    majorId?: string;
  }): ValidatedRecord<AdmissionRecord>[] {
    const data = this.years.get(academicYear);
    if (!data) return [];

    let records = Array.from(data.admissions.values());

    if (filters?.province) {
      records = records.filter((r) => r.data.province === filters.province);
    }
    if (filters?.subjectType) {
      records = records.filter((r) => r.data.subjectType === filters.subjectType);
    }
    if (filters?.universityId) {
      records = records.filter((r) => r.data.universityId === filters.universityId);
    }
    if (filters?.majorId) {
      records = records.filter((r) => r.data.majorId === filters.majorId);
    }

    return records;
  }

  /**
   * Get validated university records with provenance.
   */
  getValidatedUniversities(academicYear: number): ValidatedRecord<University>[] {
    const data = this.years.get(academicYear);
    if (!data) return [];
    return Array.from(data.universities.values());
  }

  /**
   * Get validated major records with provenance.
   */
  getValidatedMajors(academicYear: number): ValidatedRecord<Major>[] {
    const data = this.years.get(academicYear);
    if (!data) return [];
    return Array.from(data.majors.values());
  }

  /**
   * Get year data directly (for internal reader use).
   */
  getYearData(academicYear: number): YearData | undefined {
    return this.years.get(academicYear);
  }

  /**
   * Clear all data (for testing).
   */
  clear(): void {
    this.years.clear();
  }
}

/**
 * Determine if new record is higher quality than existing.
 * Priority: official > crawled > manual; higher reliability; newer timestamp.
 */
function isHigherQuality<T>(
  newer: ValidatedRecord<T>,
  existing: ValidatedRecord<T>
): boolean {
  const typeRank: Record<string, number> = {
    official: 4,
    api: 3,
    manual: 2,
    crawled: 1,
    ai_generated: 0,
    user_submitted: 0,
  };

  const newRank = typeRank[newer.provenance.source.type] ?? 0;
  const oldRank = typeRank[existing.provenance.source.type] ?? 0;

  if (newRank !== oldRank) return newRank > oldRank;
  if (newer.provenance.source.reliability !== existing.provenance.source.reliability) {
    return newer.provenance.source.reliability > existing.provenance.source.reliability;
  }
  return new Date(newer.provenance.collectedAt) > new Date(existing.provenance.collectedAt);
}

// Singleton instance for app-wide use
const defaultRepository = new DataRepository();

export { DataRepository, defaultRepository };
