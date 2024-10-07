import { getEventDetail } from '@/controllers/EventController';

export async function GET({params}: {params: {eventId:string}}) {
    return getEventDetail(params.eventId);
}