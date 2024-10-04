import { getWinnerHistory } from "@/controllers/WinnerHistoryController";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { eventId: string } }) {
    return getWinnerHistory(parseInt(params.eventId));
}