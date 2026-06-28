/**
 * @qixu/domain-runtime — Domain Runtime Orchestration Layer
 *
 * Purpose:
 * - Simulate AI outputs
 * - Simulate tutor matching
 * - Simulate learning path generation
 * - Simulate assessment results
 *
 * Cross-domain workflows are orchestrated here.
 * Each domain remains self-contained via @qixu/contracts.
 *
 * No backend or database required — all mock simulation.
 * Replace with real services (Supabase + LangGraph) in Sprint-008+.
 *
 * Page → Domain Mapping:
 *   /ai        → ai domain
 *   /tutor     → tutor domain
 *   /dashboard → growth + user domain
 *   /tools     → ai + assessment domain
 *   /admission → knowledge domain
 */

import { registerUser, getUserProfile } from "@qixu/domain/user";
import { createLearningPlan, generateLearningPath } from "@qixu/domain/learning";
import { listTutors, matchTutor } from "@qixu/domain/tutor";
import { runDiagnostic, generateRecommendations } from "@qixu/domain/ai";
import { createAssessment, submitAnswers } from "@qixu/domain/assessment";
import { addGrowthRecord, addMilestone, generateGrowthReport } from "@qixu/domain/growth";
import { runRecommendationEngine } from "@qixu/domain/knowledge";
import type { StudentProfile } from "@qixu/domain/knowledge";

// ---------------------------------------------------------------------------
// Scenario 1: New User Onboarding
// ---------------------------------------------------------------------------

export function simulateOnboarding(input: {
  displayName: string;
  grade: string;
  school?: string;
  interests: string[];
  goals: string[];
}) {
  const user = registerUser({
    displayName: input.displayName,
    grade: input.grade,
    school: input.school ?? "",
    interests: input.interests,
    goals: input.goals,
  });
  return { user };
}

// ---------------------------------------------------------------------------
// Scenario 2: AI Diagnostic Flow
// ---------------------------------------------------------------------------

export function simulateAIDiagnostic(input: {
  userId: string;
  subject: string;
  responses: { questionId: string; answer: string }[];
}) {
  const diagnostic = runDiagnostic(input);
  addGrowthRecord({
    userId: input.userId,
    type: "reflection",
    title: `完成${input.subject}诊断`,
    description: `AI诊断显示综合水平为${diagnostic.overallLevel}`,
    data: { subject: input.subject, level: diagnostic.overallLevel },
  });
  return diagnostic;
}

// ---------------------------------------------------------------------------
// Scenario 3: Tutor Matching Flow
// ---------------------------------------------------------------------------

export function simulateTutorMatching(input: {
  studentId: string;
  subject: string;
  grade: string;
  goal: string;
}) {
  const available = listTutors({ availability: "available" });
  const match = matchTutor({
    studentId: input.studentId,
    subject: input.subject,
    grade: input.grade,
    goal: input.goal,
    preferredStyle: "structured",
  });
  const matchedTutor = available.find((t) => t.id === match.tutorId);
  return { match, tutor: matchedTutor ?? null };
}

// ---------------------------------------------------------------------------
// Scenario 4: Assessment Flow
// ---------------------------------------------------------------------------

export function simulateAssessment(input: {
  userId: string;
  subject: string;
  questions: {
    text: string;
    type: "multiple_choice" | "open_ended" | "scale";
    options?: string[];
    category: string;
    difficulty: "easy" | "medium" | "hard";
  }[];
  answers: { questionId: string; answer: string | string[] }[];
}) {
  const assessment = createAssessment({
    userId: input.userId,
    title: `${input.subject}能力评估`,
    subject: input.subject,
    questions: input.questions,
  });
  const result = submitAnswers({
    assessmentId: assessment.id,
    answers: input.answers,
  });
  if (result) {
    addGrowthRecord({
      userId: input.userId,
      type: "metric_update",
      title: `${input.subject}评估完成`,
      description: `得分 ${result.totalScore}/${result.maxScore}`,
      data: { totalScore: result.totalScore, maxScore: result.maxScore },
    });
  }
  return result;
}

// ---------------------------------------------------------------------------
// Scenario 5: Learning Path Generation
// ---------------------------------------------------------------------------

export function simulateLearningPath(input: {
  userId: string;
  goal: string;
  grade: string;
  subjects: string[];
  hoursPerWeek: number;
  durationWeeks: number;
}) {
  const path = generateLearningPath(input);

  // Also create a concrete learning plan
  createLearningPlan({
    userId: input.userId,
    title: `${input.goal} — 学习计划`,
    description: `为期${input.durationWeeks}周，每周${input.hoursPerWeek}小时的学习计划`,
    objectives: path.segments.flatMap((seg) =>
      seg.objectives.map((o) => ({
        title: o.title,
        description: o.description,
        category: o.category,
        estimatedHours: o.estimatedHours,
      }))
    ),
  });

  addGrowthRecord({
    userId: input.userId,
    type: "achievement",
    title: "学习路径已生成",
    description: `${input.goal} — ${path.segments.length}个阶段`,
  });

  return path;
}

// ---------------------------------------------------------------------------
// Scenario 6: Growth Report Summary
// ---------------------------------------------------------------------------

export function simulateGrowthReport(input: {
  userId: string;
  periodStart: string;
  periodEnd: string;
}) {
  const report = generateGrowthReport(input);

  // Add a milestone if metrics indicate progress
  const learningHours = report.metrics.find((m) => m.name === "learningHours");
  if (learningHours && learningHours.value > 0) {
    addMilestone({
      userId: input.userId,
      title: "学习报告里程碑",
      description: `完成${input.periodStart}至${input.periodEnd}期间的学习总结`,
      category: "成长",
      evidence: [report.id],
    });
  }

  return report;
}

// ---------------------------------------------------------------------------
// Scenario 7: Admission Recommendation
// ---------------------------------------------------------------------------

export function simulateAdmissionRecommendation(student: StudentProfile) {
  const result = runRecommendationEngine(student, {
    province: student.province,
    subjectType: student.subjectType,
    maxRecommendations: 20,
  });
  addGrowthRecord({
    userId: "student_001",
    type: "achievement",
    title: "完成高考志愿推荐",
    description: `${result.recommendations.length === 0 ? "暂未获得匹配推荐" : `获得${result.recommendations.length}条推荐`}`,
    data: { count: result.recommendations.length, province: student.province, subjectType: student.subjectType },
  });
  return result;
}
