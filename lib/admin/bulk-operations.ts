/**
 * Bulk Operations Utilities
 * Handle bulk actions on multiple items
 */

export type BulkOperation = 'delete' | 'activate' | 'deactivate' | 'archive';

export interface BulkOperationResult {
  success: number;
  failed: number;
  errors: string[];
}

/**
 * Bulk operation handler
 */
export async function performBulkOperation<T extends { id: string }>(
  items: T[],
  operation: BulkOperation,
  endpoint: string
): Promise<BulkOperationResult> {
  const result: BulkOperationResult = {
    success: 0,
    failed: 0,
    errors: [],
  };

  if (!items || items.length === 0) {
    return result;
  }

  const ids = items.map(item => item.id);

  try {
    const response = await fetch('/api/admin/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resourceType: endpoint,
        ids,
        operation,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      result.failed = ids.length;
      result.errors.push(error.message || 'Bulk operation failed');
      return result;
    }

    const data = await response.json();
    result.success = data.success || ids.length;
    result.failed = data.failed || 0;
    result.errors = data.errors || [];

    return result;
  } catch (error) {
    result.failed = ids.length;
    result.errors.push(error instanceof Error ? error.message : 'Unknown error');
    return result;
  }
}

/**
 * Bulk delete
 */
export async function bulkDelete<T extends { id: string }>(
  items: T[],
  endpoint: string
): Promise<BulkOperationResult> {
  return performBulkOperation(items, 'delete', endpoint);
}

/**
 * Bulk activate
 */
export async function bulkActivate<T extends { id: string }>(
  items: T[],
  endpoint: string
): Promise<BulkOperationResult> {
  return performBulkOperation(items, 'activate', endpoint);
}

/**
 * Bulk deactivate
 */
export async function bulkDeactivate<T extends { id: string }>(
  items: T[],
  endpoint: string
): Promise<BulkOperationResult> {
  return performBulkOperation(items, 'deactivate', endpoint);
}

/**
 * Validate items for bulk operation
 */
export function validateBulkOperation(
  items: any[],
  operation: BulkOperation
): { valid: boolean; message?: string } {
  if (!items || items.length === 0) {
    return { valid: false, message: 'No items selected' };
  }

  if (items.length > 1000) {
    return { valid: false, message: 'Maximum 1000 items can be processed at once' };
  }

  return { valid: true };
}

