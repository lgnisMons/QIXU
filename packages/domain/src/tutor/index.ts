/**
 * Tutor domain — public API.
 *
 * Domain: 导师匹配
 * Responsibility: Tutor listing, matching, session management.
 */

export type {
  TutorProfile, TutorMatch, TutorSession,
  TutorFilter, MatchRequestInput,
} from "./types";
export { TutorDomainError } from "./types";
export {
  listTutors, getTutor, matchTutor,
  acceptMatch, createSession, completeSession,
} from "./service";
