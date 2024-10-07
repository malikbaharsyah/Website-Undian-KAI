import { getImage } from "@/controllers/ImageController";

export async function GET({params}: {params: {eventId:string}}) {
    return getImage('events', params.eventId);
}