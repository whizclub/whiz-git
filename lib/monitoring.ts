/**
 * Error monitoring and performance tracking
 */

interface ErrorInfo {
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
  timestamp: number;
  url: string;
  userAgent: string;
}

/**
 * Error monitoring service
 */
export class ErrorMonitor {
  private errors: ErrorInfo[] = [];
  private maxErrors = 100;
  private apiEndpoint = '/api/monitoring/errors';

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalErrorHandlers();
    }
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalErrorHandlers() {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: Date.now(),
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: event.reason?.message || 'Unhandled promise rejection',
        error: event.reason,
        timestamp: Date.now(),
      });
    });
  }

  /**
   * Log an error
   */
  logError(errorInfo: Omit<ErrorInfo, 'url' | 'userAgent'>) {
    const fullError: ErrorInfo = {
      ...errorInfo,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.errors.push(fullError);

    // Keep only last N errors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Send to server in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToServer(fullError).catch(() => {
        // Silent fail - don't break app
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', fullError);
    }
  }

  /**
   * Send error to server
   */
  private async sendToServer(errorInfo: ErrorInfo) {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorInfo),
      });
    } catch (error) {
      // Fail silently
    }
  }

  /**
   * Get error logs
   */
  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  /**
   * Clear error logs
   */
  clearErrors() {
    this.errors = [];
  }
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  /**
   * Track page load performance
   */
  trackPageLoad() {
    if (typeof window === 'undefined' || !window.performance) return;

    const perfData = window.performance.timing;
    const metrics = {
      dns: perfData.domainLookupEnd - perfData.domainLookupStart,
      tcp: perfData.connectEnd - perfData.connectStart,
      ttfb: perfData.responseStart - perfData.requestStart,
      download: perfData.responseEnd - perfData.responseStart,
      dom: perfData.domComplete - perfData.domLoading,
      load: perfData.loadEventEnd - perfData.navigationStart,
    };

    Object.entries(metrics).forEach(([key, value]) => {
      this.addMetric(key, value);
    });
  }

  /**
   * Track Core Web Vitals
   */
  trackWebVitals() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.addMetric('lcp', lastEntry.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Not supported
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          this.addMetric('fid', fid);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // Not supported
    }

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.addMetric('cls', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // Not supported
    }
  }

  /**
   * Track API call performance
   */
  trackAPI(url: string, duration: number, status: number) {
    const metric = `api_${status >= 200 && status < 300 ? 'success' : 'error'}`;
    this.addMetric(metric, duration);
    
    // Track specific endpoint
    const endpoint = new URL(url, window.location.origin).pathname;
    this.addMetric(`api_${endpoint}`, duration);
  }

  /**
   * Add metric value
   */
  private addMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  /**
   * Get metric average
   */
  getMetricAverage(name: string): number | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;
    
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }

  /**
   * Get all metrics
   */
  getMetrics(): Record<string, number[]> {
    const result: Record<string, number[]> = {};
    this.metrics.forEach((values, key) => {
      result[key] = [...values];
    });
    return result;
  }
}

/**
 * Create singleton instances
 */
export const errorMonitor = typeof window !== 'undefined' ? new ErrorMonitor() : null;
export const performanceMonitor = typeof window !== 'undefined' ? new PerformanceMonitor() : null;

/**
 * Initialize monitoring
 */
export function initMonitoring() {
  if (typeof window === 'undefined') return;

  // Track page load
  if (document.readyState === 'complete') {
    performanceMonitor?.trackPageLoad();
  } else {
    window.addEventListener('load', () => {
      performanceMonitor?.trackPageLoad();
    });
  }

  // Track Web Vitals
  performanceMonitor?.trackWebVitals();
}

