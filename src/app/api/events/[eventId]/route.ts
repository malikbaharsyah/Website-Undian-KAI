import { getEventDetail, editEvent, deleteEvent } from '@/controllers/EventController';
import { verifyToken } from '@/controllers/LoginController';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {eventId:string}}) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return getEventDetail(params.eventId);
}

export async function PUT(req: NextRequest, {params}: {params: {eventId:string}}) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return editEvent(req, params.eventId);
}

export async function DELETE(req: NextRequest, {params}: {params: {eventId:string}}) {
    const { response, isRedirect } = await verifyToken(req);
    if (isRedirect) {
        return response;
    }
    return deleteEvent(req, params.eventId);
}