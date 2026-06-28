import { z } from "zod";

export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  category: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  teacherId: z.string().optional(),
  tags: z.array(z.string()),
});

export type Course = z.infer<typeof courseSchema>;
