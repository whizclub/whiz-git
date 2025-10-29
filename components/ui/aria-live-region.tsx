'use client';

import { useEffect, useState } from 'react';

/**
 * ARIA Live Region Component
 * Announces important changes to screen readers
 */
export function AriaLiveRegion({ message, priority = 'polite' }: { message: string; priority?: 'polite' | 'assertive' }) {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

/**
 * Screen Reader Announcement Hook
 */
export function useScreenReaderAnnounce() {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = (msg: string, pri: 'polite' | 'assertive' = 'polite') => {
    setMessage('');
    setPriority(pri);
    // Use timeout to trigger re-render and announcement
    setTimeout(() => {
      setMessage(msg);
    }, 100);
  };

  return { announce };
}

/**
 * Announcement Provider Component
 */
export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const { announce } = useScreenReaderAnnounce();
  const [announcements, setAnnouncements] = useState<{ message: string; priority: 'polite' | 'assertive' }[]>([]);

  useEffect(() => {
    // Listen for custom announcement events
    const handleAnnounce = (e: CustomEvent) => {
      setAnnouncements((prev) => [...prev, { message: e.detail.message, priority: e.detail.priority }]);
    };

    window.addEventListener('aria-announce', handleAnnounce as EventListener);

    return () => {
      window.removeEventListener('aria-announce', handleAnnounce as EventListener);
    };
  }, []);

  return (
    <>
      {children}
      {announcements.map((announcement, index) => (
        <AriaLiveRegion
          key={index}
          message={announcement.message}
          priority={announcement.priority}
        />
      ))}
    </>
  );
}

/**
 * Helper function to create custom announcement events
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const event = new CustomEvent('aria-announce', {
    detail: { message, priority },
  });
  window.dispatchEvent(event);
}

