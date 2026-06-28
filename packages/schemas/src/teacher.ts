import { z } from "zod";

export const teacherSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  title: z.string(),
  school: z.string(),
  avatar: z.string().optional(),
  specialties: z.array(z.string()),
  bio: z.string(),
  userId: z.string().optional(),
});

export type Teacher = z.infer<typeof teacherSchema>;

export const teacherRecruitmentSchema = z.object({
  title: z.string(),
  description: z.string(),
  targetSchools: z.array(z.string()),
});
