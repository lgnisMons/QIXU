/**
 * Data validation — ensures incoming datasets meet quality thresholds.
 */

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError { field: string; message: string; }
export interface ValidationWarning { field: string; message: string; }

export function validateDataset<T extends Record<string, unknown>>(
  rows: T[],
  requiredFields: string[],
  options?: { minRows?: number; maxNullRatio?: number }
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const minRows = options?.minRows ?? 1;
  const maxNullRatio = options?.maxNullRatio ?? 0.3;

  if (rows.length < minRows) {
    errors.push({ field: "_dataset", message: `期望至少${minRows}条记录，实际${rows.length}条` });
  }
  for (const field of requiredFields) {
    const nullCount = rows.filter((r) => r[field] === null || r[field] === undefined).length;
    const ratio = rows.length > 0 ? nullCount / rows.length : 1;
    if (ratio > maxNullRatio) {
      errors.push({ field, message: `${field} 缺失率${Math.round(ratio * 100)}%超阈值${Math.round(maxNullRatio * 100)}%` });
    } else if (ratio > 0) {
      warnings.push({ field, message: `${field} 缺失${nullCount}/${rows.length}条` });
    }
  }
  return { valid: errors.length === 0, errors, warnings };
}
