import { NextRequest, NextResponse } from "next/server";
import { getAndShuffleParticipants } from "@/controllers/ParticipantController";
import { verifyToken } from "@/controllers/LoginController";

export async function GET(req: NextRequest, {params}: {params: {eventId:string}}) {
    try { 
        const { response, isRedirect } = await verifyToken(req);
        if (isRedirect) {
            return response;
        }
        const participants = await getAndShuffleParticipants(parseInt(params.eventId));
        return NextResponse.json({message:"Success GET Shuffled Participants", data:participants }, {status: 200});
    } catch (error) {
        return NextResponse.json({message:"Error", error: "Failed to fetch participants" }, { status: 404 });
    }
}