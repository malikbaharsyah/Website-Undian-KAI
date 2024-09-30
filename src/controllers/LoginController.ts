import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const login = async (req: NextRequest) => {
    const { nipp, password } = await req.json();

    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.error("JWT_SECRET is not set");
        return NextResponse.json({ message: "Internal server error" }, { status: 501 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                nipp,
                password,
            },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign({ nipp: user.nipp }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: "1h",
        });

        return NextResponse.json({ token, message: "Login successful" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}