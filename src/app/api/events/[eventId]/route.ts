import { getEventDetail } from '@/controllers/EventController';
import { verifyToken } from '@/controllers/LoginController';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {eventId:string}}) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return getEventDetail(params.eventId);
}