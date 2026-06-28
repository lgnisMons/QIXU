/**
 * @qixu/data-pipeline — Pipeline Processor
 *
 * Core pipeline logic:
 * 1. Fetch raw data from adapter
 * 2. Normalize to standard input shapes
 * 3. Validate with Zod schemas
 * 4. Deduplicate and resolve entity references
 * 5. Assess confidence scores
 * 6. Produce ProcessedBatch results
 */

export { runPipeline } from "./processor";
export { validateBatch } from "./validator";
export { normalizeEntities } from "./normalizer";
export type { PipelineRunOptions } from "./processor";
