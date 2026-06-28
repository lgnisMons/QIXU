/**
 * @qixu/data-pipeline — Zod Validation Schemas
 *
 * Runtime validation for all data entering the pipeline.
 * Uses zod to enforce type safety before data reaches storage
 * or the recommendation engine.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const UniversityTierEnum = z.enum([
  "985",
  "211",
  "双一流",
  "普通本科",
  "专科",
]);

export const UniversityTypeEnum = z.enum([
  "综合",
  "理工",
  "师范",
  "医药",
  "农林",
  "政法",
  "财经",
  "语言",
  "艺术",
  "体育",
]);

export const MajorCategoryEnum = z.enum([
  "工学",
  "理学",
  "医学",
  "文学",
  "经济学",
  "管理学",
  "法学",
  "教育学",
  "艺术学",
  "农学",
]);

export const SubjectTypeEnum = z.enum(["物理类", "历史类"]);

export const SourceTypeEnum = z.enum([
  "official",
  "crawled",
  "user_submitted",
  "ai_generated",
  "manual",
]);

// ---------------------------------------------------------------------------
// Normalized Input Schemas (pre-domain normalization)
// ---------------------------------------------------------------------------

export const NormalizedUniversityInputSchema = z.object({
  name: z.string().min(1, "大学名称不能为空"),
  province: z.string().min(1, "省份不能为空"),
  city: z.string().min(1, "城市不能为空"),
  tier: UniversityTierEnum.optional(),
  type: UniversityTypeEnum.optional(),
  tags: z.array(z.string()).optional().default([]),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().optional().default(""),
});

export const NormalizedMajorInputSchema = z.object({
  name: z.string().min(1, "专业名称不能为空"),
  category: MajorCategoryEnum,
  employmentDirection: z.array(z.string()).optional().default([]),
  graduateDirection: z.array(z.string()).optional().default([]),
  popularity: z.number().min(1).max(10).optional().default(5),
});

export const NormalizedAdmissionInputSchema = z.object({
  universityName: z.string().min(1, "大学名称不能为空"),
  province: z.string().min(1, "省份不能为空"),
  city: z.string().min(1, "城市不能为空"),
  majorName: z.string().min(1, "专业名称不能为空"),
  subjectType: SubjectTypeEnum,
  year: z
    .number()
    .int()
    .min(2000, "年份不能早于2000")
    .max(2100, "年份不能晚于2100"),
  lowestScore: z.number().int().min(0).max(750, "分数范围异常"),
  lowestRank: z.number().int().positive("排名必须为正整数"),
  quota: z.number().int().positive().optional(),
  tuition: z.number().nonnegative().optional(),
  extras: z.record(z.unknown()).optional(),
});

// ---------------------------------------------------------------------------
// Provenance Schema
// ---------------------------------------------------------------------------

export const DataSourceSchema = z.object({
  label: z.string(),
  type: SourceTypeEnum,
  url: z.string().url().optional(),
  organization: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  ingestedAt: z.string().datetime(),
  method: z.enum(["api", "crawl", "manual_entry", "archive", "user_upload"]),
  reliability: z.number().min(0).max(1),
});

export const ConfidenceSchema = z.object({
  level: z.enum(["high", "medium", "low", "unknown"]),
  score: z.number().min(0).max(1),
  reason: z.string(),
});

export const ProvenanceSchema = z.object({
  source: DataSourceSchema,
  collectedAt: z.string().datetime(),
  academicYear: z.number().int().min(2000).max(2100),
  updatedAt: z.string().datetime(),
  confidence: ConfidenceSchema,
  version: z.string().regex(/^\d+\.\d+/, "版本号格式应为 major.minor"),
});

// ---------------------------------------------------------------------------
// Validated Record Schema
// ---------------------------------------------------------------------------

export const PipelineStatusEnum = z.enum([
  "raw",
  "normalized",
  "validated",
  "rejected",
  "published",
]);

// ---------------------------------------------------------------------------
// Batch types
// ---------------------------------------------------------------------------

export type ValidatedUniversityInput = z.infer<typeof NormalizedUniversityInputSchema>;
export type ValidatedMajorInput = z.infer<typeof NormalizedMajorInputSchema>;
export type ValidatedAdmissionInput = z.infer<typeof NormalizedAdmissionInputSchema>;
