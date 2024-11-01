import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const createWinnerHistory = async (req : NextRequest) => {
    try {
        const xUser = JSON.parse(req.headers.get('x-user')??'{}');
        const operating_area = xUser.operating_area as string;
        const body = await req.json();
        const { event_id, prize_id, nipp } = body;

        const participant = await prisma.participant.findFirst({
            where: {
                nipp,
                event_id,
            }
        });

        if (participant) {
            await prisma.winnerHistory.create({
                data: {
                    event_id,
                    prize_id,
                    operating_area,
                    participant_id: participant.participant_id,
                },
            });

            return NextResponse.json({message: "Success Create Winner"}, { status: 201 });
        }

        return NextResponse.json({message: "Participant not found"}, { status: 404 });

    } catch (error) {
        return NextResponse.json({message: error instanceof Error ? error.message : "An unknown error occurred"}, { status: 404 });
    }
};

export const getWinnerHistories = async (req: NextRequest, page: number) => {
    try {
        const xUser = JSON.parse(req.headers.get('x-user')??'{}');
        const operating_area = xUser.operating_area as string;
        const limit = 6;
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

        const totalRecords = await prisma.event.count({
            where: { operating_area },
        });

        return {
            data: events,
            meta: {
                totalRecords,
                currentPage: page,
                limit,
                totalPage: Math.ceil(totalRecords / limit),
            },
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
};

export const getDetailWinnerHistory = async (eventId: number) => {
    try {
        if (!eventId) {
            throw new Error("Event ID is required");
        }

        const winnerHistories = await prisma.winnerHistory.findMany({
            where: { event_id: eventId },
            include: {
                participant: {
                    select: {
                        nipp: true,
                        name: true,
                        operating_area: true,
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
            return { message: "No winner history found for this event" };
        }

        const formattedWinnerHistories = winnerHistories.map((winnerHistory) => {
            return {
                nipp: winnerHistory.participant?.nipp || "N/A",
                participant: winnerHistory.participant?.name || "N/A",
                prize: winnerHistory.prize?.name || "N/A",
                operating_area: winnerHistory.participant?.operating_area || "N/A",
            };
        });

        return formattedWinnerHistories;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
};

export const getWinnerHistory = async (eventId: number) => {
    try {
        const winnerHistories = await prisma.winnerHistory.findMany({
            where: { event_id: eventId },
            include: {
                participant: {
                    select: {
                        nipp: true,
                        name: true,
                    },
                },
                prize: {
                    select: {
                        prize_id: true,
                    },
                },
            }
        });
        if (winnerHistories) {
            return NextResponse.json({message:"Success GET Winner History", data:winnerHistories}, { status: 200 });
        }
        return NextResponse.json({message:"Error", error: "Failed to fetch winner history" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({message: error instanceof Error ? error.message : "An unknown error occurred"}, { status: 404 });
    }
}