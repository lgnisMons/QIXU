/**
 * Bootstrap — convenient factory for setting up the complete pipeline.
 */

import { DataRepository } from "./repository/repository";
import { DataReader, createDataReader } from "./reader/reader";
import { runPipeline } from "./pipeline/processor";
import type { DataSourceAdapter, PipelineResult } from "./types";
import { AdapterRegistry, createAdapterRegistry } from "./adapters/registry";
import { BuiltInAdapter } from "./adapters/built-in";

export interface QIXUPipeline {
  repository: DataRepository;
  reader: DataReader;
  registry: AdapterRegistry;

  /** Ingest data from a registered adapter */
  ingestFrom(
    adapter: DataSourceAdapter,
    options: {
      academicYear: number;
      province?: string;
      version?: string;
      autoPublish?: boolean;
    }
  ): Promise<PipelineResult>;

  /** Ingest data from a registered adapter by ID */
  ingest(
    adapterId: string,
    options: {
      academicYear: number;
      province?: string;
      version?: string;
      autoPublish?: boolean;
    }
  ): Promise<PipelineResult>;

  /** Initialize with built-in mock data (for development) */
  initBuiltIn(academicYear?: number): Promise<PipelineResult>;
}

/**
 * Create a fully configured pipeline instance.
 */
export function createPipeline(options?: {
  repository?: DataRepository;
  registerBuiltIn?: boolean;
}): QIXUPipeline {
  const repository = options?.repository ?? new DataRepository();
  const reader = createDataReader(repository);
  const registry = createAdapterRegistry();

  if (options?.registerBuiltIn !== false) {
    registry.register(new BuiltInAdapter());
  }

  async function ingestFrom(
    adapter: DataSourceAdapter,
    opts: {
      academicYear: number;
      province?: string;
      version?: string;
      autoPublish?: boolean;
    }
  ): Promise<PipelineResult> {
    const result = await runPipeline({
      adapter,
      academicYear: opts.academicYear,
      province: opts.province,
      version: opts.version,
      autoPublish: opts.autoPublish,
    });
    repository.ingest(result);
    return result;
  }

  async function ingest(
    adapterId: string,
    opts: {
      academicYear: number;
      province?: string;
      version?: string;
      autoPublish?: boolean;
    }
  ): Promise<PipelineResult> {
    const adapter = registry.get(adapterId);
    if (!adapter) {
      throw new Error(`Adapter "${adapterId}" not found in registry`);
    }
    return ingestFrom(adapter, opts);
  }

  async function initBuiltIn(academicYear: number = 2025): Promise<PipelineResult> {
    const adapter = new BuiltInAdapter();
    return ingestFrom(adapter, { academicYear, autoPublish: true });
  }

  return {
    repository,
    reader,
    registry,
    ingestFrom,
    ingest,
    initBuiltIn,
  };
}
