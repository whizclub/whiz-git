'use client';

import { useState } from 'react';
import { Trash2, CheckCircle, XCircle, Archive, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  bulkDelete,
  bulkActivate,
  bulkDeactivate,
  validateBulkOperation,
  BulkOperation,
} from '@/lib/admin/bulk-operations';
import { createActivityLog } from '@/lib/admin/activity-log';
import toast from 'react-hot-toast';

interface BulkOperationsToolbarProps<T extends { id: string }> {
  selectedItems: T[];
  endpoint: string;
  itemType: string;
  onOperationComplete: () => void;
  onClearSelection: () => void;
  currentUser?: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Bulk Operations Toolbar
 * Allows admins to perform bulk actions on selected items
 */
export function BulkOperationsToolbar<T extends { id: string }>({
  selectedItems,
  endpoint,
  itemType,
  onOperationComplete,
  onClearSelection,
  currentUser,
}: BulkOperationsToolbarProps<T>) {
  const [processing, setProcessing] = useState(false);

  if (selectedItems.length === 0) {
    return null;
  }

  const handleBulkOperation = async (operation: BulkOperation) => {
    const validation = validateBulkOperation(selectedItems, operation);
    if (!validation.valid) {
      toast.error(validation.message || 'Invalid operation');
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to ${operation} ${selectedItems.length} ${itemType}?`
    );

    if (!confirmed) return;

    setProcessing(true);

    try {
      let result;
      
      switch (operation) {
        case 'delete':
          result = await bulkDelete(selectedItems, endpoint);
          break;
        case 'activate':
          result = await bulkActivate(selectedItems, endpoint);
          break;
        case 'deactivate':
          result = await bulkDeactivate(selectedItems, endpoint);
          break;
        default:
          throw new Error('Unknown operation');
      }

      // Log activity
      if (currentUser) {
        await createActivityLog({
          type: 'bulk_operation',
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email,
          action: `Bulk ${operation} ${itemType}`,
          details: {
            operation,
            itemType,
            count: selectedItems.length,
            success: result.success,
            failed: result.failed,
          },
        });
      }

      if (result.success > 0) {
        toast.success(`${result.success} ${itemType} ${operation}d successfully`);
      }

      if (result.failed > 0) {
        toast.error(`${result.failed} ${itemType} failed to ${operation}`);
        if (result.errors.length > 0) {
          console.error('Bulk operation errors:', result.errors);
        }
      }

      onOperationComplete();
      onClearSelection();
    } catch (error) {
      toast.error(`Failed to ${operation} ${itemType}`);
      console.error('Bulk operation error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const operations = [
    {
      label: 'Activate',
      operation: 'activate' as BulkOperation,
      icon: CheckCircle,
      variant: 'default' as const,
    },
    {
      label: 'Deactivate',
      operation: 'deactivate' as BulkOperation,
      icon: XCircle,
      variant: 'outline' as const,
    },
    {
      label: 'Delete',
      operation: 'delete' as BulkOperation,
      icon: Trash2,
      variant: 'destructive' as const,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50 lg:left-64">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            {selectedItems.length} {itemType} selected
          </span>
        </div>

        <div className="flex items-center gap-2">
          {operations.map((op) => {
            const Icon = op.icon;
            return (
              <Button
                key={op.operation}
                variant={op.variant}
                size="sm"
                onClick={() => handleBulkOperation(op.operation)}
                disabled={processing}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {op.label}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            disabled={processing}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}


