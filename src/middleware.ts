import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Add performance headers
  const pathname = request.nextUrl.pathname;

  // Cache static assets aggressively
  if (pathname.startsWith('/images/') || 
      pathname.startsWith('/_next/static/') ||
      pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|ico|svg)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache API routes for a short time
  else if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300');
  }
  
  // Cache pages with revalidation
  else {
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, must-revalidate');
  }

  // Add compression hint
  response.headers.set('Vary', 'Accept-Encoding');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
