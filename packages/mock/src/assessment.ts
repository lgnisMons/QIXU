/**
 * Mock assessment data — typed interfaces only, no JSON.
 * Replace with LangGraph agent output in Sprint-008.
 */

export interface AssessmentGrade {
  value: string;
  label: string;
}

export interface AssessmentTarget {
  value: string;
  label: string;
}

export interface AssessmentResult {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  updatedAt: string;
}

export const mockAssessmentGrades: AssessmentGrade[] = [
  { value: "primary", label: "小学" },
  { value: "junior", label: "初中" },
  { value: "senior", label: "高中" },
  { value: "college", label: "大学及以上" },
];

export const mockAssessmentTargets: AssessmentTarget[] = [
  { value: "score", label: "提升成绩" },
  { value: "interest", label: "培养兴趣" },
  { value: "exam", label: "备考冲刺" },
  { value: "career", label: "职业规划" },
  { value: "gaokao_volunteer", label: "高考志愿" },
];

export function generateMockAssessment(
  grade: string,
  target: string,
  subject?: string
): AssessmentResult {
  const base = subject ? `${subject}领域` : "综合";
  return {
    strengths: [
      `${base}基础概念掌握扎实`,
      "学习主动性较强",
    ],
    weaknesses: [
      `${base}知识体系有待系统化`,
      "跨学科综合应用能力可进一步提升",
    ],
    suggestions: [
      `建议从${target || "基础巩固"}入手，逐步建立知识框架`,
      "每周安排2-3次针对性练习",
      "利用 AI 助手进行薄弱环节的智能检测",
    ],
    updatedAt: new Date().toISOString(),
  };
}
