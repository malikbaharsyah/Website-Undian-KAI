import { getEventDetail } from '@/controllers/EventController';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {eventId:string}}) {
    return getEventDetail(params.eventId);
}