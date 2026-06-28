import type { UserProfile, UserPreferences, UserStats, RegisterUserInput } from "./types";
import { generateId } from "../utils";

const mockUsers: Map<string, UserProfile> = new Map();

export function registerUser(input: RegisterUserInput): UserProfile {
  const profile: UserProfile = {
    id: generateId("usr"), displayName: input.displayName, avatar: "",
    grade: input.grade, school: input.school,
    interests: input.interests, goals: input.goals,
    preferredSubjects: input.interests.slice(0, 3), joinedAt: new Date().toISOString(),
  };
  mockUsers.set(profile.id, profile);
  return profile;
}

export function getUserProfile(id: string): UserProfile | undefined { return mockUsers.get(id); }

export function getUserPreferences(_userId: string): UserPreferences {
  return { theme: "system", language: "zh-CN", notifications: { email: true, sms: false, inApp: true }, learningPreferences: { preferredTime: "afternoon", sessionLength: 45, learningStyle: "visual" } };
}

export function getUserStats(userId: string): UserStats {
  const profile = mockUsers.get(userId);
  return { userId, totalLearningHours: 0, completedObjectives: 0, activePlans: 0, tutorSessions: 0, streak: 0, lastActiveAt: profile?.joinedAt ?? new Date().toISOString() };
}
