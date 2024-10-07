import { getWinnerHistory } from "@/controllers/WinnerHistoryController";

export async function GET({ params }: { params: { eventId: string } }) {
    return getWinnerHistory(parseInt(params.eventId));
}