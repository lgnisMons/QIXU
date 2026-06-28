/** Dataset version metadata — supports incremental updates and rollback. */

export interface DataVersion {
  /** Semantic version (e.g., "2025.1") */
  version: string;
  /** ISO 8601 */
  releasedAt: string;
  /** What changed */
  changelog: string;
  /** Number of records in this version */
  recordCount: number;
}

export function createVersion(version: string, changelog: string, recordCount: number): DataVersion {
  return { version, changelog, recordCount, releasedAt: new Date().toISOString() };
}

export function compareVersions(a: DataVersion, b: DataVersion): number {
  return a.version.localeCompare(b.version);
}
