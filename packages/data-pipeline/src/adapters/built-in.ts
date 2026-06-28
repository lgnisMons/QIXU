/**
 * BuiltInAdapter — Development adapter using @qixu/domain mock data.
 *
 * This adapter serves as a reference implementation and provides
 * immediate data for development without external dependencies.
 *
 * It also demonstrates the normalization process: mock data already
 * matches domain types, but we still go through normalize() to show
 * how source-specific data would be transformed.
 */

import {
  mockUniversities,
  mockMajors,
  mockAdmissionRecords,
} from "@qixu/domain/knowledge";
import type {
  DataSourceAdapter,
  NormalizedUniversityInput,
  NormalizedMajorInput,
  NormalizedAdmissionInput,
} from "../types";

interface BuiltInRawRecord {
  type: "university" | "major" | "admission";
  data: unknown;
}

export class BuiltInAdapter implements DataSourceAdapter<BuiltInRawRecord> {
  readonly id = "built-in-mock";
  readonly label = "内置模拟数据";
  readonly sourceType = "manual" as const;
  readonly reliability = 0.6; // Mock data is not verified

  async fetch(options: {
    academicYear: number;
    province?: string;
  }): Promise<BuiltInRawRecord[]> {
    const { academicYear, province } = options;
    const records: BuiltInRawRecord[] = [];

    // Universities — same across years in mock
    const unis = province
      ? mockUniversities.filter((u) => u.province === province)
      : mockUniversities;
    for (const u of unis) {
      records.push({ type: "university", data: u });
    }

    // Majors — same across years
    for (const m of mockMajors) {
      records.push({ type: "major", data: m });
    }

    // Admissions — filter by year and province
    const admissions = mockAdmissionRecords.filter((r) => {
      if (r.year !== academicYear) return false;
      if (province && r.province !== province) return false;
      return true;
    });
    for (const a of admissions) {
      records.push({ type: "admission", data: a });
    }

    return records;
  }

  normalize(
    raw: BuiltInRawRecord[],
    meta: { academicYear: number }
  ): {
    universities: NormalizedUniversityInput[];
    majors: NormalizedMajorInput[];
    admissions: NormalizedAdmissionInput[];
  } {
    const universities: NormalizedUniversityInput[] = [];
    const majors: NormalizedMajorInput[] = [];
    const admissions: NormalizedAdmissionInput[] = [];

    for (const record of raw) {
      if (record.type === "university") {
        const u = record.data as (typeof mockUniversities)[number];
        universities.push({
          name: u.name,
          province: u.province,
          city: u.city,
          tier: u.tier,
          type: u.type,
          tags: u.tags,
          website: u.website,
          description: u.description,
        });
      } else if (record.type === "major") {
        const m = record.data as (typeof mockMajors)[number];
        majors.push({
          name: m.name,
          category: m.category,
          employmentDirection: m.employmentDirection,
          graduateDirection: m.graduateDirection,
          popularity: m.popularity,
        });
      } else if (record.type === "admission") {
        const a = record.data as (typeof mockAdmissionRecords)[number];
        // Look up university/major names
        const uni = mockUniversities.find((u) => u.id === a.universityId);
        const maj = mockMajors.find((m) => m.id === a.majorId);
        admissions.push({
          universityName: uni?.name ?? a.universityId,
          province: a.province,
          city: uni?.city ?? "",
          majorName: maj?.name ?? a.majorId,
          subjectType: a.subjectType,
          year: meta.academicYear,
          lowestScore: a.lowestScore,
          lowestRank: a.lowestRank,
          quota: a.quota,
          tuition: a.tuition,
        });
      }
    }

    return { universities, majors, admissions };
  }
}
