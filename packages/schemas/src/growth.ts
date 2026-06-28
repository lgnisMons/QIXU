import { z } from "zod";

export const growthStageSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  subtitle: z.string(),
  description: z.string(),
  icon: z.enum(["compass", "layers", "rocket"]),
  agentStateKey: z.string().optional(),
});

export type GrowthStage = z.infer<typeof growthStageSchema>;

export const growthRecordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  stageId: z.string(),
  progress: z.number().min(0).max(100),
  achievements: z.array(z.string()),
  updatedAt: z.string().datetime(),
});

export type GrowthRecord = z.infer<typeof growthRecordSchema>;
