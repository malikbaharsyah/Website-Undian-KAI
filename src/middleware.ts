import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/login') {
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;
    console.log('Token:', token);

    if (!token) {
        console.log('No token found, redirecting to login');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string);
        console.log('Token is valid');
        return NextResponse.next(); 
    } catch (error) {
        console.error('JWT verification failed:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/lottery/:path*', '/participants/:path*', '/events/:path*', '/winner-history/:path*'],
};
