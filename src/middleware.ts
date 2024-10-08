import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/login') {
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;

    if (!token) {
        console.log('Token not found');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/lottery/:path*',
        '/participants/:path*',
        '/events/:path*',
        '/winner-history/:path*',
        '/api/combobox-event/:path*',
        '/api/detail-winner-history/:path*',
        '/api/events/:path*',
        '/api/participants/:path*',
        '/api/winner-histories/:path*',
    ],
};
