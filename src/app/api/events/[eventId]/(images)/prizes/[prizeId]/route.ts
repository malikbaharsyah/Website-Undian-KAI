import { getImage } from "@/controllers/ImageController";
import { verifyToken } from "@/controllers/LoginController";


export async function GET(req: NextRequest, {params}: {params: {eventId:string, prizeId:string}}) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return getImage('prizes', `${params.eventId}_${params.prizeId}`);
}