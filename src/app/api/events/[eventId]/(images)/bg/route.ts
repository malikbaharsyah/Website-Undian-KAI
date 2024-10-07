import { getImage } from "@/controllers/ImageController";
import { verifyToken } from "@/controllers/LoginController";

export async function GET(req: NextRequest, {params}: {params: {eventId:string}}) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return getImage('events', params.eventId);
}