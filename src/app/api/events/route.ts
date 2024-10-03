import { createEvent, getEvents } from "@/controllers/EventController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return createEvent(req);
}

export async function GET(req: NextRequest) {
    return getEvents(req);
}