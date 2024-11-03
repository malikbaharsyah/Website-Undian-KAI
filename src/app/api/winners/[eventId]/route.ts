import { verifyToken } from "@/controllers/LoginController";
import { getWinnersDetail } from "@/controllers/ParticipantController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { eventId: string } }) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return getWinnersDetail(req, parseInt(params.eventId));
}