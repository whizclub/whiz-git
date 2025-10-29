/**
 * Admin Panel Export Utilities
 * Export data to CSV, Excel, and JSON formats
 */

export type ExportFormat = 'csv' | 'json' | 'xlsx';

export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  includeHeaders?: boolean;
}

/**
 * Convert data array to CSV string
 */
export function convertToCSV(data: any[], headers?: string[]): string {
  if (!data || data.length === 0) return '';

  // Auto-detect headers if not provided
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Create header row
  const headerRow = csvHeaders.map(h => `"${String(h)}"`).join(',');
  
  // Create data rows
  const dataRows = data.map(row => {
    return csvHeaders.map(header => {
      const value = row[header];
      // Escape quotes and wrap in quotes
      const stringValue = value === null || value === undefined ? '' : String(value);
      return `"${stringValue.replace(/"/g, '""')}"`;
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Convert data array to JSON string
 */
export function convertToJSON(data: any[]): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Download file
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export data to file
 */
export function exportData(
  data: any[],
  options: ExportOptions
) {
  const { format, filename = 'export', includeHeaders = true } = options;
  const timestamp = new Date().toISOString().split('T')[0];

  let content: string;
  let mimeType: string;
  let extension: string;

  switch (format) {
    case 'csv':
      content = convertToCSV(data);
      mimeType = 'text/csv;charset=utf-8;';
      extension = 'csv';
      break;
    case 'json':
      content = convertToJSON(data);
      mimeType = 'application/json';
      extension = 'json';
      break;
    case 'xlsx':
      // For Excel, we'll export as CSV for now (requires xlsx library for full support)
      content = convertToCSV(data);
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      extension = 'csv'; // Change to 'xlsx' when library added
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }

  const fullFilename = `${filename}_${timestamp}.${extension}`;
  downloadFile(content, fullFilename, mimeType);
}

/**
 * Export users data
 */
export function exportUsers(users: any[]) {
  const formatted = users.map(user => ({
    ID: user.id,
    Name: user.name || '',
    Email: user.email || '',
    Role: user.role || 'USER',
    Status: user.isActive ? 'Active' : 'Inactive',
    'Created At': user.createdAt ? new Date(user.createdAt).toLocaleString() : '',
    'Last Login': user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '',
  }));

  exportData(formatted, {
    format: 'csv',
    filename: 'users_export',
    includeHeaders: true,
  });
}

/**
 * Export courses data
 */
export function exportCourses(courses: any[]) {
  const formatted = courses.map(course => ({
    ID: course.id,
    Title: course.title || '',
    Description: course.description || '',
    Category: course.category || '',
    Price: course.price || '0',
    Level: course.level || '',
    Status: course.isActive ? 'Active' : 'Inactive',
    'Created At': course.createdAt ? new Date(course.createdAt).toLocaleString() : '',
    'Updated At': course.updatedAt ? new Date(course.updatedAt).toLocaleString() : '',
  }));

  exportData(formatted, {
    format: 'csv',
    filename: 'courses_export',
    includeHeaders: true,
  });
}

/**
 * Export exam papers data
 */
export function exportExamPapers(papers: any[]) {
  const formatted = papers.map(paper => ({
    ID: paper.id,
    'Course Name': paper.courseName || '',
    Year: paper.year || '',
    Title: paper.title || '',
    Description: paper.description || '',
    'Total Marks': paper.totalMarks || '',
    Duration: paper.duration || '',
    'Exam Date': paper.examDate ? new Date(paper.examDate).toLocaleString() : '',
    Status: paper.isActive ? 'Active' : 'Inactive',
    'Created At': paper.createdAt ? new Date(paper.createdAt).toLocaleString() : '',
  }));

  exportData(formatted, {
    format: 'csv',
    filename: 'exam_papers_export',
    includeHeaders: true,
  });
}

/**
 * Export analytics data
 */
export function exportAnalytics(analytics: any) {
  const data = [
    {
      Metric: 'Total Users',
      Value: analytics.totalUsers || 0,
      Date: new Date().toISOString(),
    },
    {
      Metric: 'Active Users',
      Value: analytics.activeUsers || 0,
      Date: new Date().toISOString(),
    },
    {
      Metric: 'Total Tests',
      Value: analytics.totalTests || 0,
      Date: new Date().toISOString(),
    },
    {
      Metric: 'Total Attempts',
      Value: analytics.totalAttempts || 0,
      Date: new Date().toISOString(),
    },
  ];

  exportData(data, {
    format: 'csv',
    filename: 'analytics_export',
    includeHeaders: true,
  });
}


