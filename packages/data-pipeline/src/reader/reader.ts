/**
 * DataReader — read-only interface for the recommendation engine.
 *
 * GUARANTEES:
 * - Only validated data is returned
 * - All records include full provenance (source, collectedAt, confidence, version)
 * - No mutation methods are exposed
 * - Data can be filtered by confidence level
 */

import type { DataRepository } from "../repository/repository";
import type { DatasetSummary, ReadQuery, ValidatedRecord } from "../types";
import type { University, Major, AdmissionRecord, SubjectType } from "@qixu/domain/knowledge";

export interface ReadResult<T> {
  data: T[];
  meta: {
    academicYear: number;
    count: number;
    version: string;
    sources: string[];
  };
}

class DataReader {
  constructor(private repository: DataRepository) {}

  /**
   * Get available academic years (sorted descending).
   */
  listYears(): number[] {
    return this.repository.listYears();
  }

  /**
   * Get dataset summaries for all years.
   */
  listDatasets(): DatasetSummary[] {
    return this.repository.listSummaries();
  }

  /**
   * Get dataset summary for a specific year.
   */
  getDatasetSummary(academicYear: number): DatasetSummary | undefined {
    return this.repository.getSummary(academicYear);
  }

  /**
   * Get all universities for a given academic year with provenance.
   */
  getUniversities(academicYear: number): ReadResult<ValidatedRecord<University>> {
    const summary = this.repository.getSummary(academicYear);
    const records = this.repository.getValidatedUniversities(academicYear);
    const yearData = this.repository.getYearData(academicYear);

    return {
      data: records,
      meta: {
        academicYear,
        count: records.length,
        version: summary?.version ?? yearData?.activeVersion ?? "unknown",
        sources: yearData ? [...new Set(yearData.batches.map((b) => b.source))] : [],
      },
    };
  }

  /**
   * Get all majors for a given academic year with provenance.
   */
  getMajors(academicYear: number): ReadResult<ValidatedRecord<Major>> {
    const summary = this.repository.getSummary(academicYear);
    const records = this.repository.getValidatedMajors(academicYear);
    const yearData = this.repository.getYearData(academicYear);

    return {
      data: records,
      meta: {
        academicYear,
        count: records.length,
        version: summary?.version ?? yearData?.activeVersion ?? "unknown",
        sources: yearData ? [...new Set(yearData.batches.map((b) => b.source))] : [],
      },
    };
  }

  /**
   * Get validated admission records with full provenance.
   * This is the PRIMARY method the recommendation engine should use.
   *
   * IMPORTANT: Only records meeting the minimum confidence threshold
   * are returned. By default, all validated records are returned.
   */
  getAdmissionRecords(
    academicYear: number,
    query: ReadQuery = {}
  ): ReadResult<ValidatedRecord<AdmissionRecord>> {
    const {
      province,
      subjectType,
      minConfidence = "low",
    } = query;

    // Get validated records with provenance
    const records = this.repository.getValidatedAdmissionRecords(academicYear, {
      province,
      subjectType: subjectType as SubjectType | undefined,
    });

    const confidenceRank: Record<string, number> = { high: 3, medium: 2, low: 1, unknown: 0 };
    const minRank = confidenceRank[minConfidence] ?? 0;

    const filtered = records.filter((r) => {
      const level = r.provenance.confidence.level as string;
      return (confidenceRank[level] ?? 0) >= minRank;
    });

    const yearData = this.repository.getYearData(academicYear);

    return {
      data: filtered,
      meta: {
        academicYear,
        count: filtered.length,
        version: yearData?.activeVersion ?? "unknown",
        sources: yearData ? [...new Set(yearData.batches.map((b) => b.source))] : [],
      },
    };
  }

  /**
   * Get a single university by ID.
   */
  getUniversityById(academicYear: number, id: string): University | undefined {
    return this.repository.getUniversityById(academicYear, id);
  }

  /**
   * Get a single major by ID.
   */
  getMajorById(academicYear: number, id: string): Major | undefined {
    return this.repository.getMajorById(academicYear, id);
  }

  /**
   * Get the latest available academic year.
   */
  getLatestYear(): number | undefined {
    const years = this.repository.listYears();
    return years[0];
  }
}

/**
 * Factory function to create a DataReader from a repository.
 */
export function createDataReader(repository: DataRepository): DataReader {
  return new DataReader(repository);
}

export { DataReader };
