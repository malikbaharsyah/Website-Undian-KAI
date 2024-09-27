import { createEvent } from "@/controllers/EventController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return createEvent(req);
}