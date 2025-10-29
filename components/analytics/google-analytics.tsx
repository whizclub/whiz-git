'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView } from '@/lib/analytics';

/**
 * Google Analytics Component
 * Automatically tracks page views and initializes GA
 */
function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view on route change
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Analytics Component wrapped in Suspense
 * Automatically tracks page views and initializes GA
 */
export function GoogleAnalytics() {
  useEffect(() => {
    // Initialize GA on mount
    initGA();
  }, []);

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}

/**
 * Analytics Provider Component
 * Wraps app with analytics tracking
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize monitoring
    if (typeof window !== 'undefined') {
      const { initMonitoring } = require('@/lib/monitoring');
      initMonitoring();
    }
  }, []);

  return (
    <>
      <GoogleAnalytics />
      {children}
    </>
  );
}

