/**
 * Mock teacher data — typed interfaces only, no JSON.
 * Replace with Supabase queries in Sprint-007.
 */

export interface Teacher {
  id: string;
  name: string;
  title: string;
  school: string;
  avatar: string;
  specialties: string[];
  bio: string;
  userId?: string;
}

export const mockTeachers: Teacher[] = [
  {
    id: "tutor-yang-1",
    name: "杨老师",
    title: "AI 与编程导师",
    school: "暨南大学",
    avatar: "",
    specialties: ["AI 素养", "编程入门", "电子信息"],
    bio: "暨南大学电子与信息工程硕士，专注 AI 素养教育与编程启蒙，引导学生建立面向未来的技术视野。",
    userId: undefined,
  },
  {
    id: "tutor-liao",
    name: "廖老师",
    title: "数学与逻辑思维导师",
    school: "中山大学",
    avatar: "",
    specialties: ["数学思维", "逻辑推理", "竞赛指导"],
    bio: "中山大学数学系硕士，擅长数学思维训练与逻辑推理培养，引导学生建立严谨的数学思维框架。",
    userId: undefined,
  },
  {
    id: "tutor-yang-2",
    name: "杨老师",
    title: "学业规划导师",
    school: "南方医科大学",
    avatar: "",
    specialties: ["学业规划", "学习方法", "医学素养"],
    bio: "南方医科大学本科，擅长学习方法指导与学业规划，帮助学习者建立科学高效的学习体系。",
    userId: undefined,
  },
];

export const teacherRecruitment = {
  title: "导师招募中",
  description:
    "我们正在与深圳大学、香港中文大学（深圳）等高校的优秀教育者建立合作。",
  targetSchools: [
    "深圳大学",
    "香港中文大学（深圳）",
    "南方科技大学",
    "哈尔滨工业大学（深圳）",
  ],
} as const;
