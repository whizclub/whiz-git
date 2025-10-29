/**
 * Analytics utilities for WhizClub platform
 */

// Google Analytics 4 configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Initialize Google Analytics
 */
export function initGA() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  if (!window.dataLayer) {
    (window as any).dataLayer = [];
  }
  const dataLayer = window.dataLayer as any[];
  function gtag(...args: any[]) {
    dataLayer.push(args);
  }
  
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  // Make gtag available globally
  (window as any).gtag = gtag;
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', eventName, {
    event_category: eventParams?.category,
    event_label: eventParams?.label,
    value: eventParams?.value,
    ...eventParams,
  });
}

/**
 * Track user actions
 */
export const trackUserAction = {
  login: (method: string) => {
    trackEvent('login', { method, category: 'authentication' });
  },

  signup: () => {
    trackEvent('sign_up', { category: 'authentication' });
  },

  courseView: (courseId: string, courseName: string) => {
    trackEvent('view_item', {
      category: 'course',
      item_id: courseId,
      item_name: courseName,
    });
  },

  examPaperView: (paperId: string, paperYear: number) => {
    trackEvent('view_item', {
      category: 'exam_paper',
      item_id: paperId,
      item_year: paperYear,
    });
  },

  testStart: (testId: string, testName: string) => {
    trackEvent('begin_checkout', {
      category: 'test',
      item_id: testId,
      item_name: testName,
    });
  },

  testComplete: (testId: string, score: number) => {
    trackEvent('complete_test', {
      category: 'test',
      item_id: testId,
      score,
    });
  },

  downloadFile: (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      category: 'download',
      file_name: fileName,
      file_type: fileType,
    });
  },

  search: (searchTerm: string, resultsCount: number) => {
    trackEvent('search', {
      category: 'engagement',
      search_term: searchTerm,
      results_count: resultsCount,
    });
  },

  donation: (amount: number) => {
    trackEvent('donation', {
      category: 'revenue',
      value: amount,
      currency: 'INR',
    });
  },
};

/**
 * Track performance metrics
 */
export function trackPerformance(metric: string, value: number, label?: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'timing_complete', {
    name: metric,
    value: Math.round(value),
    event_category: 'Performance',
    event_label: label,
  });
}

/**
 * Track errors
 */
export function trackError(error: Error, fatal = false) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'exception', {
    description: error.message,
    fatal: fatal,
    error_name: error.name,
    error_stack: error.stack,
  });
}

/**
 * Track conversions
 */
export function trackConversion(conversionId: string, value?: number) {
  trackEvent('conversion', {
    conversion_id: conversionId,
    value,
    category: 'conversion',
  });
}

/**
 * Set user properties
 */
export function setUserProperties(properties: {
  userId?: string;
  userRole?: string;
  [key: string]: any;
}) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('set', 'user_properties', properties);
}

/**
 * Declare global types
 */
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

