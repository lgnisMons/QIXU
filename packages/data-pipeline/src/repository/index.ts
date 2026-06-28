/**
 * @qixu/data-pipeline — Repository (Storage Layer)
 *
 * In-memory repository for admission data organized by academic year.
 * This is the authoritative data store; in production this will be
 * backed by Supabase/PostgreSQL, but the interface remains the same.
 *
 * Key guarantees:
 * - Data is always organized by academic year
 * - Only published/validated data is accessible to the recommendation engine
 * - Multiple sources can contribute to the same year (merged)
 * - Version history is preserved
 */

export { DataRepository, defaultRepository } from "./repository";
export type { YearData } from "./repository";
