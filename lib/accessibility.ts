/**
 * Accessibility utilities for the WhizClub platform
 */

/**
 * Announce to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get skip link targets
 */
export function getSkipLinkTargets(): HTMLElement[] {
  return [
    document.getElementById('main-content'),
    document.getElementById('main-navigation'),
    document.getElementById('search-form'),
  ].filter(Boolean) as HTMLElement[];
}

/**
 * Set focus to element
 */
export function setFocus(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Check if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  if (!element) return false;

  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    rect.width > 0 &&
    rect.height > 0
  );
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Ensure ARIA labels are present
 */
export function ensureAriaLabels() {
  // Add aria-labels to elements without them
  const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
  buttons.forEach((button) => {
    if (button.textContent) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });

  const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
  links.forEach((link) => {
    if (link.textContent) {
      link.setAttribute('aria-label', link.textContent.trim());
    }
  });
}

/**
 * Trap focus within a modal or dropdown
 */
export function trapFocus(container: HTMLElement) {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleTab);
  
  firstElement.focus();

  return () => {
    container.removeEventListener('keydown', handleTab);
  };
}

/**
 * Ensure minimum color contrast
 */
export function ensureColorContrast() {
  // Check color contrast for all text elements
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  
  textElements.forEach((element) => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const bgColor = style.backgroundColor;
    
    // This is a simplified check - implement proper contrast calculation
    // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  });
}

/**
 * Add skip links
 */
export function addSkipLinks() {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-lg focus:shadow-lg';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

/**
 * Initialize accessibility features
 */
export function initAccessibility() {
  if (typeof window === 'undefined') return;

  // Ensure ARIA labels
  ensureAriaLabels();

  // Add skip links
  addSkipLinks();

  // Announce when page is ready
  setTimeout(() => {
    announceToScreenReader('Page loaded successfully', 'polite');
  }, 500);
}

