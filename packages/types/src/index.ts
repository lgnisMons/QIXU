/**
 * Shared type definitions for the QIXU platform.
 * Add domain-specific types here as they are defined during feature sprints.
 */

export type ID = string;

export interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseEntity extends Timestamped {
  id: ID;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncResult<T, E = Error> = Promise<
  | { success: true; data: T }
  | { success: false; error: E }
>;
