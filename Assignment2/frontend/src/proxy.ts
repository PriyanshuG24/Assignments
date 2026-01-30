import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/deals',
];

const authRoutes = [
    '/signin',
    '/signup'
];

const publicRoutes = [
    '/'
];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('accessToken')?.value ||
        request.headers.get('authorization')?.replace('Bearer ', '');

    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isPublicRoute && token && pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isProtectedRoute && !token) {
        const signinUrl = new URL('/signin', request.url);
        signinUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(signinUrl);
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)'
    ],
};
