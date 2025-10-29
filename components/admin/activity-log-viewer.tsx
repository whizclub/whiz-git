'use client';

import { useState, useEffect } from 'react';
import { Activity, Filter, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getActivityLogs, formatActivityDescription, ActivityType } from '@/lib/admin/activity-log';
import type { ActivityLog } from '@/lib/admin/activity-log';

/**
 * Activity Log Viewer Component
 * Displays admin activity logs with filtering
 */
export function ActivityLogViewer() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    type?: ActivityType;
    userId?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  useEffect(() => {
    loadLogs();
  }, [filters]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const activityLogs = await getActivityLogs({
        type: filters.type,
        userId: filters.userId,
        startDate: filters.startDate ? new Date(filters.startDate) : undefined,
        endDate: filters.endDate ? new Date(filters.endDate) : undefined,
        limit: 100,
      });
      setLogs(activityLogs);
    } catch (error) {
      console.error('Error loading activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const activityTypeColors: Record<string, string> = {
    user_created: 'bg-green-100 text-green-800',
    user_updated: 'bg-blue-100 text-blue-800',
    user_deleted: 'bg-red-100 text-red-800',
    user_activated: 'bg-emerald-100 text-emerald-800',
    user_deactivated: 'bg-yellow-100 text-yellow-800',
    course_created: 'bg-purple-100 text-purple-800',
    course_updated: 'bg-indigo-100 text-indigo-800',
    course_deleted: 'bg-red-100 text-red-800',
    bulk_operation: 'bg-orange-100 text-orange-800',
    export_data: 'bg-cyan-100 text-cyan-800',
    report_generated: 'bg-pink-100 text-pink-800',
    login: 'bg-green-100 text-green-800',
    logout: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">User</label>
            <Input
              placeholder="User ID or email"
              value={filters.userId || ''}
              onChange={(e) =>
                setFilters({ ...filters, userId: e.target.value || undefined })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value || undefined })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value || undefined })
              }
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={loadLogs}
              className="w-full"
              variant="outline"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold">Activity Logs</h3>
            <span className="ml-auto text-sm text-gray-500">
              {logs.length} entries
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading activity logs...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No activity logs found
          </div>
        ) : (
          <div className="divide-y">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          activityTypeColors[log.type] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {log.type.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatActivityDescription(log)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {log.userEmail}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {log.details && (
                      <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


