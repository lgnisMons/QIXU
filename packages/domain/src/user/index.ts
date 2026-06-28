/**
 * User domain — public API.
 *
 * Domain: 用户
 * Responsibility: User profiles, preferences, statistics.
 * Future: Supabase Auth integration.
 */

export type { UserProfile, UserPreferences, UserStats, RegisterUserInput } from "./types";
export { UserDomainError } from "./types";
export { registerUser, getUserProfile, getUserPreferences, getUserStats } from "./service";
