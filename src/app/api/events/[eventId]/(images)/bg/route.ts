import { NextRequest, NextResponse } from "next/server";
import { getImage } from "@/controllers/ImageController";

export async function GET(req: NextRequest, {params}: {params: {eventId:string}}) {
    return getImage('events', params.eventId);
}