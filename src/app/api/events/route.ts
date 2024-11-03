import { createEvent, getEvents, editEvent, deleteEvent } from "@/controllers/EventController";
import { verifyToken } from "@/controllers/LoginController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return createEvent(req);
}

export async function GET(req: NextRequest) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return getEvents(req);
}