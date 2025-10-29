/**
 * Automated Report Generation
 * Generate various admin reports
 */

export type ReportType = 
  | 'users'
  | 'courses'
  | 'exam-papers'
  | 'analytics'
  | 'activity'
  | 'performance'
  | 'engagement'
  | 'comprehensive';

export interface ReportPeriod {
  startDate: Date;
  endDate: Date;
}

export interface GeneratedReport {
  id: string;
  type: ReportType;
  title: string;
  period: ReportPeriod;
  generatedAt: Date;
  generatedBy: string;
  data: any;
  summary: ReportSummary;
  fileUrl?: string;
}

export interface ReportSummary {
  totalRecords: number;
  keyMetrics: Record<string, number>;
  insights: string[];
  recommendations: string[];
}

/**
 * Generate report
 */
export async function generateReport(
  type: ReportType,
  period?: ReportPeriod
): Promise<GeneratedReport> {
  try {
    const response = await fetch('/api/admin/reports/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        period: period ? {
          startDate: period.startDate.toISOString(),
          endDate: period.endDate.toISOString(),
        } : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    const data = await response.json();
    return data.report;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
}

/**
 * Schedule automated report
 */
export async function scheduleReport(
  type: ReportType,
  schedule: 'daily' | 'weekly' | 'monthly',
  recipientEmail: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/reports/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        schedule,
        recipientEmail,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error scheduling report:', error);
    return false;
  }
}

/**
 * Get report templates
 */
export function getReportTemplates(): Array<{
  type: ReportType;
  title: string;
  description: string;
  defaultPeriod?: string;
}> {
  return [
    {
      type: 'users',
      title: 'User Activity Report',
      description: 'Overview of user registrations, activity, and engagement',
      defaultPeriod: 'last 30 days',
    },
    {
      type: 'courses',
      title: 'Course Performance Report',
      description: 'Course enrollments, completion rates, and popularity',
      defaultPeriod: 'last 30 days',
    },
    {
      type: 'exam-papers',
      title: 'Exam Papers Report',
      description: 'Exam attempts, scores, and performance metrics',
      defaultPeriod: 'last 30 days',
    },
    {
      type: 'analytics',
      title: 'Platform Analytics Report',
      description: 'Overall platform metrics and trends',
      defaultPeriod: 'last 7 days',
    },
    {
      type: 'activity',
      title: 'Activity Log Report',
      description: 'Admin actions and system activities',
      defaultPeriod: 'last 7 days',
    },
    {
      type: 'performance',
      title: 'Performance Report',
      description: 'User performance and test scores analysis',
      defaultPeriod: 'last 30 days',
    },
    {
      type: 'engagement',
      title: 'Engagement Report',
      description: 'User engagement metrics and behavior patterns',
      defaultPeriod: 'last 30 days',
    },
    {
      type: 'comprehensive',
      title: 'Comprehensive Report',
      description: 'Complete overview of all platform metrics',
      defaultPeriod: 'last 30 days',
    },
  ];
}

/**
 * Format report period
 */
export function formatReportPeriod(period: ReportPeriod): string {
  const start = period.startDate.toLocaleDateString();
  const end = period.endDate.toLocaleDateString();
  return `${start} - ${end}`;
}

/**
 * Get default report period
 */
export function getDefaultPeriod(type: 'daily' | 'weekly' | 'monthly'): ReportPeriod {
  const endDate = new Date();
  const startDate = new Date();

  switch (type) {
    case 'daily':
      startDate.setDate(startDate.getDate() - 1);
      break;
    case 'weekly':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'monthly':
      startDate.setMonth(startDate.getMonth() - 1);
      break;
  }

  return { startDate, endDate };
}


