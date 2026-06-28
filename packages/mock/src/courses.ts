/**
 * Mock course data — typed interfaces only, no JSON.
 * Replace with Supabase queries in Sprint-007.
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  teacherId?: string;
  tags: string[];
}

export const mockCourses: Course[] = [
  {
    id: "course-ai-intro",
    title: "AI 素养入门",
    description: "面向 AI 时代的基础素养课程，了解 AI 原理与应用边界。",
    category: "AI 能力",
    difficulty: "beginner",
    tags: ["AI", "入门", "素养"],
  },
  {
    id: "course-programming",
    title: "Python 编程基础",
    description: "从零开始学习 Python 编程，掌握编程思维与基本语法。",
    category: "编程开发",
    difficulty: "beginner",
    tags: ["Python", "编程", "入门"],
  },
  {
    id: "course-math-logic",
    title: "数学逻辑思维",
    description: "培养逻辑推理能力与数学思维，为高阶学习打下基础。",
    category: "学科素养",
    difficulty: "intermediate",
    tags: ["数学", "逻辑", "思维训练"],
  },
  {
    id: "course-study-methods",
    title: "科学学习方法",
    description: "基于认知科学的系统学习方法，提升学习效率与记忆效果。",
    category: "学习方法",
    difficulty: "beginner",
    tags: ["学习方法", "记忆", "效率"],
  },
];
