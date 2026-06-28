/**
 * Tutor domain contracts.
 * Pure TypeScript types — no implementation, no runtime dependency.
 */

/** Tutor profile */
export interface TutorProfile {
  id: string;
  name: string;
  title: string;
  school: string;
  avatar: string;
  specialties: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  availability: "available" | "limited" | "unavailable";
}

/** A tutor-student match result */
export interface TutorMatch {
  id: string;
  studentId: string;
  tutorId: string;
  score: number;
  reasons: string[];
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

/** A tutoring session record */
export interface TutorSession {
  id: string;
  matchId: string;
  studentId: string;
  tutorId: string;
  topic: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduledAt: string;
  completedAt?: string;
  notes?: string;
}
