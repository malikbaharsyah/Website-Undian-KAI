import { getDetailWinnerHistory } from "@/controllers/WinnerHistoryController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = parseInt(searchParams.get("event_id") || "", 10);
        
        const winnerHistory = await getDetailWinnerHistory(eventId);
        return NextResponse.json({message:"Success GET Winner History", winnerHistory}, { status: 201 });
    }  catch (error) {
        return NextResponse.json({ error: "Failed to fetch detail winner history" }, { status: 500 });
    }
}
