import { getWinnerHistories, createWinnerHistory } from "@/controllers/WinnerHistoryController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page") || "1";
        const pageNumber = parseInt(page, 10);

        const winnerHistories = await getWinnerHistories(pageNumber);
        return NextResponse.json(winnerHistories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch winner histories" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    return createWinnerHistory(req);
}
