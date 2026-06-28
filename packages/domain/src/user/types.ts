export type { UserProfile, UserPreferences, UserStats } from "@qixu/contracts";
export class UserDomainError extends Error {
  constructor(message: string, public code: string) { super(message); this.name = "UserDomainError"; }
}
export interface RegisterUserInput { displayName: string; grade: string; school: string; interests: string[]; goals: string[]; }
