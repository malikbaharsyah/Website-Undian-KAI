import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

import { parseExcel } from '@/controllers/ParticipantController';
import Participant from '../app/components/interfaces/Participant';



const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(process.cwd(), 'uploads');

const prisma = new PrismaClient();

interface PrizeData {
    name: string;
    quantity: string;
}

export const createEvent = async (req: NextRequest) => {
    const prisma = new PrismaClient();

    try {
        const xUser = JSON.parse(req.headers.get('x-user')??'{}');
        const operating_area = xUser.operating_area as string;


        const latestEvent = await prisma.event.findFirst({
            orderBy: {
                event_id: 'desc'
            },
            select: {
                event_id: true
            }
        });
        const newEvent_id = latestEvent ? latestEvent.event_id + 1 : 0;

        const formData = await req.formData();

        const participantsFile = formData.get('participants') as File;
        let participants: Participant[] = [];

        if (participantsFile) {
            const excelFilePath = await saveExcel(participantsFile, 'participants', '2');
            participants = await parseExcel(excelFilePath, newEvent_id);
        }

        const eventImage = formData.get('image') as File;
        if (eventImage) {
            await saveFile(eventImage, 'events', '2');
        }

        const prizes: any[] = [];
        const prize_length = parseInt(formData.get('prize_length') as string);
        for (let i = 0; i < prize_length; i++) {
            const prizeData = formData.get(`prize[${i}]`) as string;
            if (prizeData) {
                const prize = JSON.parse(prizeData) as PrizeData;
                const prizeName = prize.name as string;
                const prizeQuantity = prize.quantity as string;
                const prizeImage = formData.get(`prize_image[${i}]`) as File;

                if (prizeImage) {
                    await saveFile(prizeImage, 'prizes', `${newEvent_id}_${i}`);
                }

                prizes.push({
                    name: prizeName,
                    quantity: parseInt(prizeQuantity),
                    operating_area: operating_area,
                    image: `events/${newEvent_id}/prizes/${i}`,
                    event_id: newEvent_id,
                });
            }
        }

        const name = formData.get('name') as string;
        const startDate = formData.get('start_date') as string;
        const endDate = formData.get('end_date') as string;

        const newEvent = await prisma.$transaction(async (prisma) => {
            await prisma.event.create({
                data: {
                    event_id: newEvent_id,
                    name,
                    start_date: new Date(startDate),
                    end_date: new Date(endDate),
                    image: `events/${newEvent_id}/bg`,
                    operating_area
                }
            });

            if (participants.length > 0) {
                await prisma.participant.createMany({
                    data: participants
                });
            }

            if (prizes.length > 0) {
                await prisma.prize.createMany({
                    data: prizes
                });
            }

        });

        return NextResponse.json({ message: 'Event created successfully', event: newEvent }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 501 });
    } finally {
        await prisma.$disconnect();
    }
};

export const editEvent = async (req: NextRequest, eventId: string) => {
    try {
        const xUser = JSON.parse(req.headers.get('x-user')??'{}');
        const operating_area = xUser.operating_area as string;

        const formData = await req.formData();

        const prizes: any[] = [];
        const prize_length = parseInt(formData.get('prize_length') as string);
        for (let i = 0; i < prize_length; i++) {
            const prizeData = formData.get(`prize[${i}]`) as string;
            if (prizeData) {
                const prize = JSON.parse(prizeData) as PrizeData;
                const prizeName = prize.name as string;
                const prizeQuantity = prize.quantity as string;
                const prizeImage = formData.get(`prize_image[${i}]`) as File;

                if (prizeImage) {
                    await saveFile(prizeImage, 'prizes', `${eventId}_${i}`);
                }

                prizes.push({
                    name: prizeName,
                    quantity: parseInt(prizeQuantity),
                    operating_area: operating_area, 
                    image: `events/${eventId}/prizes/${i}`,
                    event_id: parseInt(eventId),
                });
            }
        }

        const name = formData.get('name') as string;
        const startDate = formData.get('start_date') as string;
        const endDate = formData.get('end_date') as string;

        const participantsFile = formData.get('participants') as File;
        let participants: Participant[] = [];

        if (participantsFile) {
            const excelFilePath = await saveExcel(participantsFile, 'participants', '2');
            participants = await parseExcel(excelFilePath, parseInt(eventId));
        }

        const updatedEvent = await prisma.event.update({
            where: {
                event_id: parseInt(eventId)
            },
            data: {
                name,
                start_date: new Date(startDate),
                end_date: new Date(endDate),
            }
        });

        if (prizes.length > 0) {
            await prisma.prize.deleteMany({
                where: {
                    event_id: parseInt(eventId)
                }
            });

            await prisma.prize.createMany({
                data: prizes
            });
        }

        if (participants.length > 0) {
            await prisma.participant.deleteMany({
                where: {
                    event_id: parseInt(eventId)
                }
            });

            await prisma.participant.createMany({
                data: participants
            });
        }

        return NextResponse.json({ message: 'Event updated successfully', event: updatedEvent }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 500 });
    }
}

export const getEvents = async (req: NextRequest) => {
    try {
        const xPage = req.headers.get('x-page');
        const xUser = JSON.parse(req.headers.get('x-user')??'{}');
        const operating_area = xUser.operating_area as string;
        const role = xUser.role as string;
        if (xPage === '/events') {
            const { searchParams } = new URL(req.url);
            const page = parseInt(searchParams.get("page") || "1", 10);
            const limit = 7;
            const skip = (page - 1) * limit;
            let events;
            if (role === 'superadmin') {
                events = await prisma.event.findMany({
                skip,
                take: limit,
                select: {
                    event_id: true,
                    name: true,
                    start_date: true,
                    end_date: true,
                    operating_area: true,
                },
                });
            } else {
                events = await prisma.event.findMany({
                    where: { operating_area },
                    skip,
                    take: limit,
                    select: {
                        event_id: true,
                        name: true,
                        start_date: true,
                        end_date: true,
                        operating_area: true,
                    },
                    });
            }
    
            const totalRecords = await prisma.event.count({ where: { operating_area } });
    
            return NextResponse.json({
            data: events,
            meta: {
                totalRecords,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
            },
            });
        } else {
            let events;
            if (role === 'superadmin') {
                events = await prisma.event.findMany({
                where: {
                    start_date: {
                        lte: new Date(),
                    }, end_date: {
                        gte: new Date(),
                    }
                 },
                select: {
                    event_id: true,
                    name: true,
                    start_date: true,
                    end_date: true,
                    operating_area: true,
                },
                });
            } else {
                events = await prisma.event.findMany({
                    where: { operating_area,
                        start_date: {
                            lte: new Date(),
                        }, end_date: {
                            gte: new Date(),
                        }
                     },
                    select: {
                        event_id: true,
                        name: true,
                        start_date: true,
                        end_date: true,
                        operating_area: true,
                    },
                    });
            }
            return NextResponse.json(
                {data: events, message: "Success GET events"},
                { status: 200 }
            )
        }

    } catch (error) {
        return NextResponse.json(
        { error: error instanceof Error ? error.message : "Unknown error occurred" },
        { status: 500 }
        );
    }
};

export const deleteEvent = async (req: NextRequest, eventId: string) => {
    try {
        await prisma.event.delete({
            where: {
                event_id: parseInt(eventId)
            }
        });
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error occurred" }, { status: 500 });
    }
}


export const getEventDetail = async (id: string) => {
    try {
        const event_id = parseInt(id);
        const event = await prisma.event.findUnique({
            where: {
                event_id
            }
        });
        const prizes = await prisma.prize.findMany({
            where: {
                event_id: event_id
            }
        });
        return NextResponse.json({message:"Success GET event detail", data:
            {
                event_name: event?.name,
                operating_area: event?.operating_area,
                start_date: event?.start_date,
                end_date: event?.end_date,
                prizes
            }
        }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

async function saveFile(file: File, folder: string, id: string) {
    let dir = path.join(UPLOAD_PATH, folder);
    if (folder === 'prizes') {
        const ids = id.split('_');
        const eventId = ids[0];
        const prizeId = ids[1];
        dir = path.join(dir, eventId);
        id = prizeId;
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${id}.png`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, new Uint8Array(buffer));
}

async function saveExcel(file: File, folder: string, id: string) {
    const dir = path.join(UPLOAD_PATH, folder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${id}.xlsx`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, new Uint8Array(buffer));
    return filePath;
}