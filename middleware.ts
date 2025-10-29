import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security middleware with authentication checks
 * Adds security headers and performs authentication checks
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  // Only dashboard and admin require login - all content is now public
  const protectedRoutes = [
    '/dashboard',
    '/admin',
  ];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Get authentication cookie
  const sessionCookie = request.cookies.get('next-auth.session-token') || 
                       request.cookies.get('__Secure-next-auth.session-token');
  const userSessionCookie = request.cookies.get('user_session');

  const isAuthenticated = !!(sessionCookie || userSessionCookie);

  // Only check authentication for protected routes (dashboard and admin)
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login with callback URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    
    const response = NextResponse.redirect(loginUrl);
    return addSecurityHeaders(response, request);
  }

  // All other routes (including all content) are public - allow access
  return addSecurityHeaders(NextResponse.next(), request);
}

/**
 * Adds security headers to the response
 */
function addSecurityHeaders(response: NextResponse, request: NextRequest) {
  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.vercel.app",
    "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.vercel.app",
    "img-src 'self' data: https: blob: vercel-storage.com",
    "font-src 'self' data: https: https://fonts.gstatic.com https://r2cdn.perplexity.ai",
    "connect-src 'self' https://whiz-club.vercel.app https://*.vercel.app",
    "frame-ancestors 'self'",
    "form-action 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // CORS headers (adjust for your needs)
  const origin = request.headers.get('origin');
  if (origin === 'https://whizclub.com' || origin === 'http://localhost:3000') {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
