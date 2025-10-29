/**
 * Performance utilities for the WhizClub platform
 */

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(element: HTMLImageElement | null) {
  if (!element) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '50px' }
  );

  observer.observe(element);
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Track performance metrics
 */
export function trackPerformance() {
  if (typeof window === 'undefined') return;

  // Track Page Load Time
  window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('Page Load Time:', pageLoadTime + 'ms');
    
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'page_load',
        value: Math.round(pageLoadTime),
      });
    }
  });

  // Track Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('LCP:', lastEntry.startTime);
        
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'lcp',
            value: Math.round(lastEntry.startTime),
          });
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Performance Observer not supported
    }
  }

  // Track First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Type assertion for PerformanceEventTiming
          const eventEntry = entry as any;
          
          // Check if processingStart exists (only on EventTiming entries)
          if (eventEntry.processingStart !== undefined) {
            const fid = eventEntry.processingStart - eventEntry.startTime;
            
            console.log('FID:', fid);
            
            if (window.gtag) {
              window.gtag('event', 'timing_complete', {
                name: 'fid',
                value: Math.round(fid),
              });
            }
          }
        }
      });

      observer.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // Performance Observer not supported
    }
  }
}

/**
 * Measure component render time
 */
export function measureComponent(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && window.performance) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`Component "${name}" rendered in ${Math.round(end - start)}ms`);
  } else {
    fn();
  }
}

/**
 * Declare global types for gtag
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Optimize large data arrays
 */
export function paginateArray<T>(array: T[], pageSize: number = 10) {
  const pages: T[][] = [];
  
  for (let i = 0; i < array.length; i += pageSize) {
    pages.push(array.slice(i, i + pageSize));
  }
  
  return pages;
}

/**
 * Memoize expensive function calls
 */
export function memoize<Args extends any[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const cache = new Map<string, Return>();

  return (...args: Args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  };
}

/**
 * Check if user is on slow connection
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return false;

  // Check if connection is 2G or slow
  return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData === true;
}

/**
 * Limit concurrent API calls
 */
export async function limitConcurrency<T>(
  promises: Promise<T>[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const promise of promises) {
    const p = promise.then((result) => {
      results.push(result);
      executing.splice(executing.indexOf(p), 1);
    });

    executing.push(p);

    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

/**
 * Compress data before storing
 */
export function compressData(data: any): string {
  return JSON.stringify(data);
}

/**
 * Cache API responses
 */
export class APICache {
  private cache: Map<string, { data: any; timestamp: number }>;
  private ttl: number;

  constructor(ttl: number = 5 * 60 * 1000) {
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

