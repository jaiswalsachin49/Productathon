import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value; // In a real app with HttpOnly cookies

    // For this hackathon implementation using localStorage in AuthContext, 
    // we can't easily check auth in middleware without cookies.
    // So we'll rely on client-side checks in Layout/Context for now, 
    // or we can implement a simple check if we were using cookies.

    // Allow all requests for now, let AuthContext handle redirects
    return NextResponse.next();
}

export const config = {
    matcher: ['/sales-manager/:path*', '/sales-officer/:path*'],
};
