/**
 * @qixu/data-pipeline — Data Source Adapters
 *
 * Pluggable data source adapter system. Each adapter implements
 * the DataSourceAdapter interface, allowing the pipeline to
 * consume data from any source without modification.
 *
 * Built-in adapters:
 * - BuiltInAdapter: Uses existing @qixu/domain mock data (development)
 *
 * Future adapters can be added:
 * - OfficialCrawlAdapter: Crawl official education bureau websites
 * - ExcelImportAdapter: Import from Excel/CSV files
 * - ApiAdapter: Fetch from external APIs
 * - ManualEntryAdapter: Admin manual data entry
 */

export type { DataSourceAdapter } from "../types";
export { BuiltInAdapter } from "./built-in";
export { AdapterRegistry, createAdapterRegistry } from "./registry";
