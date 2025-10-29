'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MobileTableProps {
  headers: string[];
  data: Array<Record<string, any>>;
  title?: string;
  className?: string;
}

/**
 * Responsive table component that shows as a table on desktop
 * and as cards on mobile for better mobile experience
 */
export function MobileTable({ headers, data, title, className }: MobileTableProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-bold mb-4">{title}</h3>
      )}
      
      {/* Desktop: Show as table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              {headers.map((header, idx) => (
                <th 
                  key={idx}
                  className="px-4 py-3 text-left font-bold text-sm rounded-tl-lg last:rounded-tr-lg"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr 
                key={rowIdx}
                className={`border-b border-gray-200 hover:bg-purple-50 transition-colors ${
                  rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {headers.map((header, colIdx) => (
                  <td 
                    key={colIdx}
                    className="px-4 py-3 text-gray-900"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Show as cards */}
      <div className="lg:hidden space-y-3">
        {data.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {headers.map((header, colIdx) => (
              <div
                key={colIdx}
                className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <span className="text-sm font-semibold text-gray-600 min-w-[120px]">
                  {header}:
                </span>
                <span className="text-sm text-gray-900 text-right flex-1 ml-4">
                  {row[header]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Mobile-friendly accordion table for complex data
 */
export function MobileAccordionTable({ headers, data, title, className }: MobileTableProps) {
  const [expanded, setExpanded] = React.useState<Set<number>>(new Set());

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpanded(newExpanded);
  };

  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-bold mb-4">{title}</h3>
      )}
      
      {/* Desktop: Show as table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              {headers.map((header, idx) => (
                <th 
                  key={idx}
                  className="px-4 py-3 text-left font-bold text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr 
                key={rowIdx}
                className={`border-b border-gray-200 hover:bg-purple-50 transition-colors ${
                  rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {headers.map((header, colIdx) => (
                  <td 
                    key={colIdx}
                    className="px-4 py-3 text-gray-900"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Show as accordions */}
      <div className="lg:hidden space-y-2">
        {data.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleExpand(rowIdx)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              aria-expanded={expanded.has(rowIdx)}
            >
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">
                  {row[headers[0]]}
                </div>
                {row[headers[1]] && (
                  <div className="text-sm text-gray-600 mt-1">
                    {row[headers[1]]}
                  </div>
                )}
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expanded.has(rowIdx) ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expanded.has(rowIdx) && (
              <div className="px-4 pb-4 space-y-2 border-t border-gray-200">
                {headers.slice(2).map((header, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex items-start justify-between py-2"
                  >
                    <span className="text-sm font-semibold text-gray-600 min-w-[120px]">
                      {header}:
                    </span>
                    <span className="text-sm text-gray-900 text-right flex-1 ml-4">
                      {row[header]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

