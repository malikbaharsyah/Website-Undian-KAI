import { verifyToken } from "@/controllers/LoginController";
import { getWinnerHistory } from "@/controllers/WinnerHistoryController";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { eventId: string } }) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return getWinnerHistory(parseInt(params.eventId));
}