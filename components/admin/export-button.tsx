'use client';

import { useState } from 'react';
import { Download, FileText, FileJson, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportData, ExportFormat } from '@/lib/admin/export-utils';
import { trackEvent } from '@/lib/analytics';

interface ExportButtonProps {
  data: any[];
  filename?: string;
  label?: string;
  formats?: ExportFormat[];
}

/**
 * Export Button Component
 * Provides dropdown menu for exporting data in different formats
 */
export function ExportButton({
  data,
  filename = 'export',
  label = 'Export',
  formats = ['csv', 'json'],
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    setExporting(true);
    setIsOpen(false);

    try {
      exportData(data, {
        format,
        filename,
        includeHeaders: true,
      });

      // Track export event
      trackEvent('data_exported', {
        category: 'admin',
        format,
        record_count: data.length,
      });
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const formatIcons = {
    csv: FileSpreadsheet,
    json: FileText,
    xlsx: FileSpreadsheet,
  };

  const formatLabels = {
    csv: 'CSV',
    json: 'JSON',
    xlsx: 'Excel',
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        disabled={exporting || !data || data.length === 0}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        {exporting ? 'Exporting...' : label}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
            <div className="py-1">
              {formats.map((format) => {
                const Icon = formatIcons[format];
                return (
                  <button
                    key={format}
                    onClick={() => handleExport(format)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Icon className="w-4 h-4" />
                    Export as {formatLabels[format]}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}


