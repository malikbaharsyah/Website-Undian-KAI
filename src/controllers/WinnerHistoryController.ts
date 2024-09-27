import { PrismaClient } from "@prisma/client";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const createWinnerHistory = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { eventId, participantId, prizeId, operatingArea } = body;

        const winnerHistory = await prisma.winnerHistory.create({
            data: {
                event_id: eventId,
                participant_id: participantId,
                prize_id: prizeId,
                operating_area: operatingArea,
            },
        });

        return NextResponse.json(winnerHistory, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
};

// TODO : get operating_area from jwt
export const getWinnerHistories = async (req: NextRequest, res: NextResponse) => {
    try {
        const operating_area = "Pusat";

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 8;
        const skip = (page - 1) * limit;
        
        const events = await prisma.event.findMany({
            where: { operating_area },
            skip,
            take: limit,
            select: {
                event_id: true,
                name: true,
            },
        });

        return NextResponse.json({
            data : events,
            meta : {
                totalRecords: events.length,
                currentPage: page,
                limit,
                totalPage: Math.ceil(events.length / limit),
            }
        }, { status: 201 });

    } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            } else {
                return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
            }
    }
}

export const getDetailWinnerHistoryByEventId = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get("event_id");

        if (!eventId) {
            return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
        }

        const winnerHistories = await prisma.winnerHistory.findMany({
            where: { event_id: parseInt(eventId) },
            include: {
                participant: {
                    select: {
                        nipp: true,
                        name: true,
                    },
                },
                prize: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (winnerHistories.length === 0) {
            return NextResponse.json({ message: "No winner history found for this event" }, { status: 404 });
        }

        return NextResponse.json(winnerHistories, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
};
