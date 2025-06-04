import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Assuming token is stored in a cookie

  // Redirect to login if no token and trying to access the homepage
  if (!token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/notes/:path*', '/mynotes/:path*'], // Apply middleware to homepage and notes routes
}; 