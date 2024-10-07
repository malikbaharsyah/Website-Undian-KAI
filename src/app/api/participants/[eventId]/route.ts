import { NextResponse } from "next/server";
import { getAndShuffleParticipants } from "@/controllers/ParticipantController";

export async function GET({params}: {params: {eventId:string}}) {
    try { 
        const participants = await getAndShuffleParticipants(parseInt(params.eventId));
        return NextResponse.json({message:"Success GET Shuffled Participants", data:participants }, {status: 201});
    } catch (error) {
        return NextResponse.json({message:"Error", error: "Failed to fetch participants" }, { status: 401 });
    }
}