/**
 * Adapter Registry — manages available data source adapters.
 */

import type { DataSourceAdapter } from "../types";

class AdapterRegistry {
  private adapters: Map<string, DataSourceAdapter> = new Map();

  /** Register an adapter */
  register(adapter: DataSourceAdapter): void {
    if (this.adapters.has(adapter.id)) {
      throw new Error(`Adapter "${adapter.id}" is already registered`);
    }
    this.adapters.set(adapter.id, adapter);
  }

  /** Get an adapter by ID */
  get(id: string): DataSourceAdapter | undefined {
    return this.adapters.get(id);
  }

  /** List all registered adapter IDs */
  list(): string[] {
    return Array.from(this.adapters.keys());
  }

  /** List all adapters with metadata */
  listAdapters(): Array<Pick<DataSourceAdapter, "id" | "label" | "sourceType" | "reliability">> {
    return Array.from(this.adapters.values()).map((a) => ({
      id: a.id,
      label: a.label,
      sourceType: a.sourceType,
      reliability: a.reliability,
    }));
  }

  /** Remove an adapter */
  unregister(id: string): boolean {
    return this.adapters.delete(id);
  }
}

/** Factory function to create a pre-populated registry */
export function createAdapterRegistry(
  ...adapters: DataSourceAdapter[]
): AdapterRegistry {
  const registry = new AdapterRegistry();
  for (const adapter of adapters) {
    registry.register(adapter);
  }
  return registry;
}

export { AdapterRegistry };
