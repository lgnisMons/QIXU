/**
 * User domain contracts.
 * Pure TypeScript types — no implementation, no runtime dependency.
 */

/** User profile */
export interface UserProfile {
  id: string;
  displayName: string;
  avatar: string;
  grade: string;
  school: string;
  interests: string[];
  goals: string[];
  preferredSubjects: string[];
  joinedAt: string;
}

/** User preferences */
export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: "zh-CN" | "en";
  notifications: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  learningPreferences: {
    preferredTime: "morning" | "afternoon" | "evening";
    sessionLength: number; // minutes
    learningStyle: "visual" | "auditory" | "reading" | "kinesthetic";
  };
}

/** User statistics summary */
export interface UserStats {
  userId: string;
  totalLearningHours: number;
  completedObjectives: number;
  activePlans: number;
  tutorSessions: number;
  streak: number;
  lastActiveAt: string;
}
