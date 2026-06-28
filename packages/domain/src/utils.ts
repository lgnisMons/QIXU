/**
 * Domain utilities — internal use only, not exported from package.
 */

let counter = 0;

export function generateId(prefix: string): string {
  counter += 1;
  const timestamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${prefix}_${timestamp}${rand}${counter}`;
}
