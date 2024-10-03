import { getDetailWinnerHistory } from "@/controllers/WinnerHistoryController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = parseInt(searchParams.get("event_id") || "", 10);
        
        const winnerHistory = await getDetailWinnerHistory(eventId);
        return NextResponse.json(winnerHistory, { status: 201 });
    }  catch (error) {
        console.error("Error fetching detail winner history:", error);
        return NextResponse.json({ error: "Failed to fetch detail winner history" }, { status: 500 });
    }
}
