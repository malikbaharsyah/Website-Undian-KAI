import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';  // Import new types for App Router

const prisma = new PrismaClient();

export const createEvent = async (req: NextRequest) => {
    try {
        const body = await req.json();
        body.operating_area = "Jakarta";

        const event = await prisma.event.create({
            data: body,
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}
