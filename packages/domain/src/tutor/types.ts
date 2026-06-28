/**
 * Tutor domain — internal types.
 */

export type {
  TutorProfile,
  TutorMatch,
  TutorSession,
} from "@qixu/contracts";

export class TutorDomainError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "TutorDomainError";
  }
}

/** Match request input */
export interface MatchRequestInput {
  studentId: string;
  subject: string;
  grade: string;
  goal: string;
  preferredStyle?: "structured" | "flexible" | "intensive";
}

/** Tutor filter criteria */
export interface TutorFilter {
  subjects?: string[];
  schools?: string[];
  availability?: "available" | "limited" | "unavailable";
  minRating?: number;
}
