/**
 * Activity Log Utilities
 * Track and manage admin activities
 */

export type ActivityType =
  | 'user_created'
  | 'user_updated'
  | 'user_deleted'
  | 'user_activated'
  | 'user_deactivated'
  | 'course_created'
  | 'course_updated'
  | 'course_deleted'
  | 'paper_created'
  | 'paper_updated'
  | 'paper_deleted'
  | 'bulk_operation'
  | 'export_data'
  | 'report_generated'
  | 'login'
  | 'logout';

export interface ActivityLog {
  id: string;
  type: ActivityType;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

/**
 * Create activity log entry
 */
export async function createActivityLog(activity: Omit<ActivityLog, 'id' | 'createdAt'>) {
  try {
    const response = await fetch('/api/admin/activity-logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...activity,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('Failed to create activity log');
    }
  } catch (error) {
    console.error('Error creating activity log:', error);
  }
}

/**
 * Get activity logs with filters
 */
export async function getActivityLogs(filters?: {
  type?: ActivityType;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}): Promise<ActivityLog[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters?.type) params.append('type', filters.type);
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.startDate) params.append('startDate', filters.startDate.toISOString());
    if (filters?.endDate) params.append('endDate', filters.endDate.toISOString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const response = await fetch(`/api/admin/activity-logs?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch activity logs');
    }

    const data = await response.json();
    return data.logs || [];
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return [];
  }
}

/**
 * Format activity description
 */
export function formatActivityDescription(log: ActivityLog): string {
  const actions: Record<ActivityType, string> = {
    user_created: 'created a user',
    user_updated: 'updated a user',
    user_deleted: 'deleted a user',
    user_activated: 'activated a user',
    user_deactivated: 'deactivated a user',
    course_created: 'created a course',
    course_updated: 'updated a course',
    course_deleted: 'deleted a course',
    paper_created: 'created an exam paper',
    paper_updated: 'updated an exam paper',
    paper_deleted: 'deleted an exam paper',
    bulk_operation: 'performed a bulk operation',
    export_data: 'exported data',
    report_generated: 'generated a report',
    login: 'logged in',
    logout: 'logged out',
  };

  return `${log.userName} ${actions[log.type] || 'performed an action'}`;
}


