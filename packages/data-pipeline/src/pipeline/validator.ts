/**
 * Validator — runtime validation using Zod schemas + business rules.
 *
 * Validates normalized entities against:
 * 1. Zod schema (type/range checks)
 * 2. Business rules (cross-field validation)
 * 3. Data completeness thresholds
 */

import {
  NormalizedUniversityInputSchema,
  NormalizedMajorInputSchema,
  NormalizedAdmissionInputSchema,
} from "../schemas";
import type {
  University,
  Major,
  AdmissionRecord,
} from "@qixu/domain/knowledge";
import type { ValidatedRecord, Provenance } from "../types";

export interface ValidationOutcome<T> {
  valid: T[];
  rejected: { data: T; errors: string[] }[];
  warnings: string[];
}

/**
 * Validate university entities.
 */
export function validateUniversities(
  universities: University[],
  provenance: Provenance
): ValidationOutcome<ValidatedRecord<University>> {
  const valid: ValidatedRecord<University>[] = [];
  const rejected: { data: ValidatedRecord<University>; errors: string[] }[] = [];
  const warnings: string[] = [];

  for (const uni of universities) {
    const errors: string[] = [];

    // Schema validation
    const result = NormalizedUniversityInputSchema.safeParse({
      name: uni.name,
      province: uni.province,
      city: uni.city,
      tier: uni.tier,
      type: uni.type,
      tags: uni.tags,
      website: uni.website,
      description: uni.description,
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`${issue.path.join(".")}: ${issue.message}`);
      }
    }

    // Business rules
    if (!uni.tier) {
      warnings.push(`大学「${uni.name}」未标注层次，已推断`);
    }
    if (!uni.website) {
      warnings.push(`大学「${uni.name}」缺少官网链接`);
    }
    if (!uni.description) {
      warnings.push(`大学「${uni.name}」缺少描述信息`);
    }

    const record: ValidatedRecord<University> = {
      data: uni,
      provenance,
      status: errors.length === 0 ? "validated" : "rejected",
      warnings: warnings.filter((w) => w.includes(uni.name)),
    };

    if (errors.length === 0) {
      valid.push(record);
    } else {
      rejected.push({ data: record, errors });
    }
  }

  return { valid, rejected, warnings };
}

/**
 * Validate major entities.
 */
export function validateMajors(
  majors: Major[],
  provenance: Provenance
): ValidationOutcome<ValidatedRecord<Major>> {
  const valid: ValidatedRecord<Major>[] = [];
  const rejected: { data: ValidatedRecord<Major>; errors: string[] }[] = [];
  const warnings: string[] = [];

  for (const major of majors) {
    const errors: string[] = [];

    const result = NormalizedMajorInputSchema.safeParse({
      name: major.name,
      category: major.category,
      employmentDirection: major.employmentDirection,
      graduateDirection: major.graduateDirection,
      popularity: major.popularity,
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`${issue.path.join(".")}: ${issue.message}`);
      }
    }

    if (major.employmentDirection.length === 0) {
      warnings.push(`专业「${major.name}」缺少就业方向信息`);
    }

    const record: ValidatedRecord<Major> = {
      data: major,
      provenance,
      status: errors.length === 0 ? "validated" : "rejected",
      warnings: warnings.filter((w) => w.includes(major.name)),
    };

    if (errors.length === 0) {
      valid.push(record);
    } else {
      rejected.push({ data: record, errors });
    }
  }

  return { valid, rejected, warnings };
}

/**
 * Validate admission records.
 * Enforces business rules:
 * - Score/rank must be positive and within reasonable ranges
 * - Quota and tuition must be non-negative
 * - Cross-reference: universityId and majorId must exist
 */
export function validateAdmissions(
  admissions: AdmissionRecord[],
  context: {
    universityIds: Set<string>;
    majorIds: Set<string>;
    provenance: Provenance;
  }
): ValidationOutcome<ValidatedRecord<AdmissionRecord>> {
  const { universityIds, majorIds, provenance } = context;
  const valid: ValidatedRecord<AdmissionRecord>[] = [];
  const rejected: { data: ValidatedRecord<AdmissionRecord>; errors: string[] }[] = [];
  const warnings: string[] = [];

  for (const adm of admissions) {
    const errors: string[] = [];

    // Schema validation
    const result = NormalizedAdmissionInputSchema.safeParse({
      universityName: "", // Already resolved to ID
      province: adm.province,
      city: "",
      majorName: "", // Already resolved to ID
      subjectType: adm.subjectType,
      year: adm.year,
      lowestScore: adm.lowestScore,
      lowestRank: adm.lowestRank,
      quota: adm.quota,
      tuition: adm.tuition,
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`${issue.path.join(".")}: ${issue.message}`);
      }
    }

    // Business rules
    if (!universityIds.has(adm.universityId)) {
      errors.push(`大学ID ${adm.universityId} 不存在于大学列表中`);
    }
    if (!majorIds.has(adm.majorId)) {
      errors.push(`专业ID ${adm.majorId} 不存在于专业列表中`);
    }
    if (adm.lowestScore < 100 || adm.lowestScore > 750) {
      errors.push(`分数${adm.lowestScore}超出合理范围(100-750)`);
    }
    if (adm.lowestRank <= 0) {
      errors.push(`排名必须为正整数`);
    }
    if (adm.tuition !== undefined && adm.tuition > 200000) {
      warnings.push(`学费¥${adm.tuition}/年较高，请核实`);
    }

    const record: ValidatedRecord<AdmissionRecord> = {
      data: adm,
      provenance,
      status: errors.length === 0 ? "validated" : "rejected",
      warnings: [],
    };

    if (errors.length === 0) {
      valid.push(record);
    } else {
      rejected.push({ data: record, errors });
    }
  }

  return { valid, rejected, warnings };
}

/**
 * Validate a complete batch of normalized entities.
 */
export function validateBatch(
  universities: University[],
  majors: Major[],
  admissions: AdmissionRecord[],
  provenance: Provenance
): {
  universities: ValidationOutcome<ValidatedRecord<University>>;
  majors: ValidationOutcome<ValidatedRecord<Major>>;
  admissions: ValidationOutcome<ValidatedRecord<AdmissionRecord>>;
} {
  // First validate universities and majors to get valid ID sets
  const uniResult = validateUniversities(universities, provenance);
  const majResult = validateMajors(majors, provenance);

  const validUniIds = new Set(uniResult.valid.map((r) => r.data.id));
  const validMajIds = new Set(majResult.valid.map((r) => r.data.id));

  // Then validate admissions against valid entities
  const admResult = validateAdmissions(admissions, {
    universityIds: validUniIds,
    majorIds: validMajIds,
    provenance,
  });

  return {
    universities: uniResult,
    majors: majResult,
    admissions: admResult,
  };
}
