/**
 * Web Vitals tracking for Core Web Vitals
 */

import { trackPerformance } from './analytics';

export type Metric = {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
};

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // Send to analytics
  trackPerformance(metric.name, metric.value);

  // Send to monitoring API
  sendToMonitoringAPI(metric).catch(() => {
    // Silent fail
  });
}

/**
 * Send metrics to monitoring API
 */
async function sendToMonitoringAPI(metric: Metric) {
  try {
    await fetch('/api/monitoring/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      }),
    });
  } catch (error) {
    // Silent fail
  }
}

/**
 * Initialize Web Vitals tracking
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Use web-vitals library if available, otherwise manual tracking
  try {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
    });
  } catch (error) {
    // Fallback to manual tracking (already in monitoring.ts)
  }
}

