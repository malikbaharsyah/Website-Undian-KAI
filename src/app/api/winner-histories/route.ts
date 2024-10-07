import { verifyToken } from "@/controllers/LoginController";
import { getWinnerHistories, createWinnerHistory } from "@/controllers/WinnerHistoryController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { response, isRedirect } = await verifyToken(req);
        if (isRedirect) {
            return response;
        }
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page") || "1";
        const pageNumber = parseInt(page, 10);

        const winnerHistories = await getWinnerHistories(req, pageNumber);
        return NextResponse.json(winnerHistories, { status: 200 });
    } catch (error) {
        console.error("Error fetching winner histories:", error);
        return NextResponse.json({ error: "Failed to fetch winner histories" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    return createWinnerHistory(req);
}
