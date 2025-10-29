/**
 * Skip to main content link for accessibility
 * Appears on focus (Tab key) and allows keyboard users to skip navigation
 */

export function SkipToContentLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
    >
      Skip to main content
    </a>
  );
}

