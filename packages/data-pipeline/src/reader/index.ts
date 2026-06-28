/**
 * @qixu/data-pipeline — Read-only Reader Interface
 *
 * This is the ONLY interface the Recommendation Engine should use
 * to access admission data. It guarantees:
 *
 * 1. Only validated/published data is returned
 * 2. No write operations are exposed
 * 3. Every data point carries provenance metadata
 * 4. Data is organized by academic year
 * 5. Queries are filtered by minimum confidence level
 *
 * The Recommendation Engine MUST NOT bypass this reader
 * to access raw data directly.
 */

export { DataReader, createDataReader } from "./reader";
export type { ReadResult } from "./reader";
export type { ReadQuery } from "../types";
