'use client';

import { useEffect } from 'react';

/**
 * Keyboard Navigation Enhancement
 * Improves keyboard navigation throughout the app
 */
export function KeyboardNavigationEnhancer() {
  useEffect(() => {
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      // Skip to main content with 'S'
      if (e.key === 's' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const mainContent = document.getElementById('main-content');
        if (mainContent && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      // Focus search with 'K'
      if (e.key === 'k' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          const searchButton = document.querySelector('[aria-label="Search"]');
          if (searchButton) {
            (searchButton as HTMLElement).click();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyboardNavigation);
    
    return () => {
      window.removeEventListener('keydown', handleKeyboardNavigation);
    };
  }, []);

  return null;
}

/**
 * Focus Trap Component
 * Traps focus within a modal or dropdown when open
 */
export function FocusTrap({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  useEffect(() => {
    if (!isActive) return;

    const focusableElements = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const element = document.querySelector('[data-focus-trap]') as HTMLElement;
    if (!element) return;

    const firstFocusable = element.querySelectorAll(focusableElements)[0] as HTMLElement;
    const lastFocusable = element.querySelectorAll(focusableElements)[element.querySelectorAll(focusableElements).length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    firstFocusable?.focus();
    element.addEventListener('keydown', handleTab);

    return () => {
      element.removeEventListener('keydown', handleTab);
    };
  }, [isActive]);

  return <div data-focus-trap>{children}</div>;
}

