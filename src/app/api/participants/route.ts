import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 8;
    const skip = (page - 1) * limit;
    const eventId = parseInt(searchParams.get("event_id") || "", 10);

    try {
        const participants = await prisma.participant.findMany({
            where: {
                ...(eventId && { event_id: eventId }),
            },
            skip,
            take: limit,
        });

        const totalRecords = await prisma.participant.count({
            where: {
                ...(eventId && { event_id: eventId }),
            },
        });

        return NextResponse.json({
            data: participants,
            meta: {
                totalRecords,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
