'use client';

import { useEffect } from 'react';

/**
 * Visible Focus Indicator
 * Makes focus indicators more prominent for keyboard users
 */
export function VisibleFocusIndicator() {
  useEffect(() => {
    // Add class to body when using keyboard navigation
    let isKeyboardUser = false;

    const handleKeyDown = () => {
      isKeyboardUser = true;
      document.body.classList.add('keyboard-navigation');
    };

    const handleMouseDown = () => {
      isKeyboardUser = false;
      document.body.classList.remove('keyboard-navigation');
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return null;
}

/**
 * Enhanced focus styles for keyboard users
 * Only shows when user is navigating with keyboard
 */
const focusIndicatorStyles = `
.keyboard-navigation *:focus-visible {
  outline: 3px solid #22c55e !important;
  outline-offset: 2px !important;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2) !important;
}

.keyboard-navigation button:focus-visible,
.keyboard-navigation a:focus-visible {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = focusIndicatorStyles;
  document.head.appendChild(styleSheet);
}

