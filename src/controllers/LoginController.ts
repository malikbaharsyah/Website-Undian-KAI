import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const login = async (req: NextRequest) => {
    const { nipp, password } = await req.json();

    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.error('JWT_SECRET is not set');
        return NextResponse.json({ message: 'Internal server error' }, { status: 501 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                nipp,
                password,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials', success: false }, { status: 400 });
        }

        const token = jwt.sign(
            {
                nipp: user.nipp,
                user_name: user.user_name,
                operating_area: user.operating_area,
                unit: user.unit,
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '24h' }
        );

        return NextResponse.json({success: true, message: 'Login successful', token},
            {
                headers: {
                    'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict;`,
                },
            }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
    }
}

export const verifyToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get('token')?.value;
        const secret = process.env.ACCESS_TOKEN_SECRET;

        if (!token) {
            return { response: NextResponse.json({message: "Unauthorized"}, {status: 401}), isRedirect: true };
        }

        if (!secret) {
            console.error('JWT secret not found');
            throw new Error('JWT secret not found');
        }

        const decoded = jwt.verify(token, secret);

        if (!decoded) {
            console.error('Invalid token');
            return { response: NextResponse.json({message: "Unauthorized"}, {status: 401}), isRedirect: true };
        }
        
        const response = NextResponse.next();
        req.headers.set('x-user', JSON.stringify(decoded));

        return { response, isRedirect: false };
    } catch (error) {
        console.error('Error verifying token:', error);
        return { response: NextResponse.json({message: "Unauthorized"}, {status: 401}), isRedirect: true };
    }
};