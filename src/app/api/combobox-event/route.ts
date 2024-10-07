import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/controllers/LoginController";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const { response, isRedirect } = await verifyToken(req);
        if (isRedirect) {
            return response;
        }
        const events = await prisma.event.findMany({
            select: {
                event_id: true,
                name: true,
            },
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
