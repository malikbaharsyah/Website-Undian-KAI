import { getImage } from "@/controllers/ImageController";

export async function GET({params}: {params: {eventId:string, prizeId:string}}) {
    return getImage('prizes', `${params.eventId}_${params.prizeId}`);
}