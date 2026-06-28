import { z } from "zod";

export const assessmentGradeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type AssessmentGrade = z.infer<typeof assessmentGradeSchema>;

export const assessmentTargetSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type AssessmentTarget = z.infer<typeof assessmentTargetSchema>;

export const assessmentResultSchema = z.object({
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
  updatedAt: z.string().datetime(),
});

export type AssessmentResult = z.infer<typeof assessmentResultSchema>;
