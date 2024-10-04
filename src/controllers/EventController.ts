import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import path, { parse } from 'path';
import fs from 'fs';

import { Participant, parseExcel } from '@/controllers/ParticipantController';

const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(process.cwd(), 'uploads');

const prisma = new PrismaClient();

interface PrizeData {
    name: string;
    quantity: string;
}

export const createEvent = async (req: NextRequest) => {
    try {
        const operating_area = "Jakarta";
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
        formData.append('operating_area', operating_area);

        
        const participantsFile = formData.get('participants') as File;
        
        let participants = new Array<Participant>();
        if (participantsFile) {
            const excelFilePath = await saveExcel(participantsFile, 'participants', '2');
            participants = await parseExcel(excelFilePath, newEvent_id);
        }
        
        const eventImage = formData.get('image') as File;
        if (eventImage) {
            await saveFile(eventImage, 'events', '2');
        }
        
        const prizes = [];
        const prize_length = parseInt(formData.get('prize_length') as string);
        for (let i = 0; i < prize_length; i++) {
            const prizeData = formData.get(`prize[${i}]`) as string;
            console.log(prizeData);
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
                    event_id: newEvent_id 
                });
            }
        }
        
        const name = formData.get('name') as string;
        const startDate = formData.get('start_date') as string;
        const endDate = formData.get('end_date') as string;

        const newEvent = await prisma.event.create({
            data: {
                event_id: newEvent_id,
                name,
                start_date: new Date(startDate),
                end_date: new Date(endDate),
                image: `events/${newEvent_id}/bg`,
                operating_area
            }
        });

        if (participants) {
            await prisma.participant.createMany({
                data: participants
            });
        }

        if (prizes) {
            await prisma.prize.createMany({
                data: prizes
            });
        }
    return NextResponse.json({ message: 'Event created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 501 });
    }
}
export const getEvents = async () => {
    try {

        // const body = await req.json();
        // body.operating_area = "Jakarta";
        const operating_area = "Jakarta";
        // sort by end_date
        const events = await prisma.event.findMany({
            where: {
                operating_area: operating_area
            },
            orderBy: {
                end_date: 'desc'
            }
        });

        return NextResponse.json({message:"Success GET events", data:events}, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

export const getEventDetail = async (id: string) => {
    try {
        const event_id = parseInt(id);
        const prizes = await prisma.prize.findMany({
            where: {
                event_id: event_id
            }
        });
        return NextResponse.json({message:"Success GET event detail", data:prizes}, { status: 201 });
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