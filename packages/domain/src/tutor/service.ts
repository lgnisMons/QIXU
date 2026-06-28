/**
 * Tutor domain — mock service.
 */

import type { TutorProfile, TutorMatch, TutorSession, TutorFilter, MatchRequestInput } from "./types";
import { generateId } from "../utils";

const mockTutors: TutorProfile[] = [
  {
    id: "tutor-yang-1", name: "杨老师", title: "AI 与编程导师",
    school: "暨南大学", avatar: "",
    specialties: ["AI 素养", "编程入门", "电子信息"],
    bio: "暨南大学电子与信息工程硕士，专注 AI 素养教育与编程启蒙。",
    rating: 4.8, reviewCount: 12, availability: "available",
  },
  {
    id: "tutor-yang-2", name: "杨老师", title: "学业规划导师",
    school: "南方医科大学", avatar: "",
    specialties: ["学业规划", "学习方法", "医学素养"],
    bio: "南方医科大学本科，擅长学习方法指导与学业规划。",
    rating: 4.6, reviewCount: 8, availability: "available",
  },
];

const mockMatches: TutorMatch[] = [];
const mockSessions: TutorSession[] = [];

export function listTutors(filter?: TutorFilter): TutorProfile[] {
  let result = mockTutors;
  if (filter?.schools?.length) {
    result = result.filter((t) => filter.schools!.includes(t.school));
  }
  if (filter?.minRating) {
    result = result.filter((t) => t.rating >= filter.minRating!);
  }
  if (filter?.availability) {
    result = result.filter((t) => t.availability === filter.availability);
  }
  return result;
}

export function getTutor(id: string): TutorProfile | undefined {
  return mockTutors.find((t) => t.id === id);
}

/** Mock: match a student with the best tutor */
export function matchTutor(input: MatchRequestInput): TutorMatch {
  const scored = mockTutors.map((tutor) => ({
    tutorId: tutor.id,
    score: Math.round((0.7 + Math.random() * 0.3) * 100) / 100,
    reasons: [
      `${tutor.name} 擅长${tutor.specialties.slice(0, 2).join("、")}`,
      `教学风格匹配${input.preferredStyle || "flexible"}`,
    ],
  }));
  const best = scored.reduce((a, b) => (a.score > b.score ? a : b));
  const match: TutorMatch = {
    id: generateId("match"),
    studentId: input.studentId,
    tutorId: best.tutorId,
    score: best.score,
    reasons: best.reasons,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  mockMatches.push(match);
  return match;
}

export function acceptMatch(matchId: string): TutorMatch | undefined {
  const match = mockMatches.find((m) => m.id === matchId);
  if (match) (match as unknown as Record<string, unknown>).status = "accepted";
  return match;
}

export function createSession(input: {
  matchId: string;
  studentId: string;
  tutorId: string;
  topic: string;
  scheduledAt: string;
}): TutorSession {
  const session: TutorSession = {
    id: generateId("sess"),
    matchId: input.matchId,
    studentId: input.studentId,
    tutorId: input.tutorId,
    topic: input.topic,
    status: "scheduled",
    scheduledAt: input.scheduledAt,
  };
  mockSessions.push(session);
  return session;
}

export function completeSession(id: string, notes?: string): TutorSession | undefined {
  const session = mockSessions.find((s) => s.id === id);
  if (session) {
    (session as unknown as Record<string, unknown>).status = "completed";
    (session as unknown as Record<string, unknown>).completedAt = new Date().toISOString();
    if (notes) (session as unknown as Record<string, unknown>).notes = notes;
  }
  return session;
}
