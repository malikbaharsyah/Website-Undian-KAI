import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getUsersByPage = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = 8
    const skip = (page - 1) * limit
    const search = searchParams.get("search") || "" // Get the search parameter

    try {
        const users = await prisma.user.findMany({
            skip,
            take: limit,
            where: {
                OR: [
                    { user_name: { contains: search, mode: "insensitive" } },
                    { nipp: { contains: search, mode: "insensitive" } },
                    { operating_area: { contains: search, mode: "insensitive" } }
                ]
            },
        })

        const totalRecords = await prisma.user.count({
            where: {
                OR: [
                    { user_name: { contains: search, mode: "insensitive" } },
                    { nipp: { contains: search, mode: "insensitive" } },
                    { operating_area: { contains: search, mode: "insensitive" } }
                ]
            }
        })

        return NextResponse.json({
            data: users,
            meta: {
                totalRecords,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
            },
        })
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        )
    }
}

export const getUserByNIPP = async (nipp: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                nipp: nipp ?? undefined,
            },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ data: user });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}

export const createUser = async (req: NextRequest) => {
    try {
        const { nipp, password, user_name, operating_area, unit, role } = await req.json();

        const user = await prisma.user.create({
            data: {
                nipp,
                password,
                user_name,
                operating_area,
                unit,
                role,
            },
        });

        return NextResponse.json({ data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}

export const updateUser = async (req: NextRequest) => {
    try {
        const { nipp, password, user_name, operating_area, unit, role } = await req.json();

        const user = await prisma.user.update({
            where: {
                nipp,
            },
            data: {
                password,
                user_name,
                operating_area,
                unit,
                role,
            },
        });

        return NextResponse.json({ data: user });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}

export const deleteUser = async (req: NextRequest) => {
    try {
        const { nipp } = await req.json();

        const user = await prisma.user.delete({
            where: {
                nipp,
            },
        });

        return NextResponse.json({ data: user });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}

