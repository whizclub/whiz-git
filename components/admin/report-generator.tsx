'use client';

import { useState } from 'react';
import { FileText, Calendar, Download, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  generateReport,
  scheduleReport,
  getReportTemplates,
  getDefaultPeriod,
  formatReportPeriod,
  ReportType,
} from '@/lib/admin/report-generator';
import { createActivityLog } from '@/lib/admin/activity-log';
import toast from 'react-hot-toast';
import type { GeneratedReport } from '@/lib/admin/report-generator';

/**
 * Report Generator Component
 * Allows admins to generate and schedule automated reports
 */
export function ReportGenerator({ currentUser }: { currentUser?: { id: string; name: string; email: string } }) {
  const [selectedType, setSelectedType] = useState<ReportType>('comprehensive');
  const [generating, setGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
  const [scheduleConfig, setScheduleConfig] = useState<{
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    email: string;
  }>({
    enabled: false,
    frequency: 'weekly',
    email: '',
  });

  const templates = getReportTemplates();

  const handleGenerate = async () => {
    setGenerating(true);
    setGeneratedReport(null);

    try {
      const period = getDefaultPeriod('monthly');
      const report = await generateReport(selectedType, period);

      setGeneratedReport(report);

      // Log activity
      if (currentUser) {
        await createActivityLog({
          type: 'report_generated',
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email,
          action: `Generated ${report.type} report`,
          details: {
            reportType: report.type,
            period: formatReportPeriod(report.period),
          },
        });
      }

      toast.success('Report generated successfully!');
    } catch (error) {
      toast.error('Failed to generate report');
      console.error('Report generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSchedule = async () => {
    if (!scheduleConfig.email) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      const success = await scheduleReport(
        selectedType,
        scheduleConfig.frequency,
        scheduleConfig.email
      );

      if (success) {
        toast.success(`Report scheduled (${scheduleConfig.frequency})`);
      } else {
        toast.error('Failed to schedule report');
      }
    } catch (error) {
      toast.error('Failed to schedule report');
      console.error('Schedule error:', error);
    }
  };

  const handleDownload = () => {
    if (!generatedReport) return;

    // In a real implementation, download the report file
    toast('Download functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Report Type Selection */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Select Report Type
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.type}
              onClick={() => setSelectedType(template.type)}
              className={`p-4 border rounded-lg text-left transition-all ${
                selectedType === template.type
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-semibold mb-1">{template.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
              <span className="text-xs text-gray-500">
                Default: {template.defaultPeriod}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Report */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">Generate Report</h3>

        <div className="flex items-center gap-4">
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Generate Report
              </>
            )}
          </Button>

          {generatedReport && (
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>

        {/* Generated Report Summary */}
        {generatedReport && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Report Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Title:</span>
                <span className="ml-2 font-medium">{generatedReport.title}</span>
              </div>
              <div>
                <span className="text-gray-600">Period:</span>
                <span className="ml-2 font-medium">
                  {formatReportPeriod(generatedReport.period)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Records:</span>
                <span className="ml-2 font-medium">
                  {generatedReport.summary.totalRecords}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Generated:</span>
                <span className="ml-2 font-medium">
                  {new Date(generatedReport.generatedAt).toLocaleString()}
                </span>
              </div>
            </div>

            {generatedReport.summary.insights.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Key Insights:</h5>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {generatedReport.summary.insights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Schedule Report */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Schedule Automated Reports
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enableSchedule"
              checked={scheduleConfig.enabled}
              onChange={(e) =>
                setScheduleConfig({ ...scheduleConfig, enabled: e.target.checked })
              }
              className="rounded"
            />
            <label htmlFor="enableSchedule" className="text-sm font-medium">
              Enable automated reporting
            </label>
          </div>

          {scheduleConfig.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <select
                  value={scheduleConfig.frequency}
                  onChange={(e) =>
                    setScheduleConfig({
                      ...scheduleConfig,
                      frequency: e.target.value as 'daily' | 'weekly' | 'monthly',
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Recipient Email</label>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={scheduleConfig.email}
                  onChange={(e) =>
                    setScheduleConfig({ ...scheduleConfig, email: e.target.value })
                  }
                />
              </div>

              <Button
                onClick={handleSchedule}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Mail className="w-4 h-4" />
                Save Schedule
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

