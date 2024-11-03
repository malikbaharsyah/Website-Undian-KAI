import * as XLSX from 'xlsx';
import fs, { stat } from 'fs';
import { PrismaClient } from '@prisma/client';

import Participant from '../app/components/interfaces/Participant';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function parseExcel(filePath: string, eventId: number): Promise<Participant[]> {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
    const readFile = fs.readFileSync(filePath);
    const workbook = XLSX.read(readFile, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const participantsData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const participants: Participant[] = participantsData.slice(1).map((row: any) => ({
        nipp: row[0].toString(),
        name: row[1],
        operating_area: row[2],
        event_id: eventId,
    }));

    fs.unlinkSync(filePath);
    return participants;
}


export async function getNIPPParticipants(eventId: number): Promise<string[]> {
    const participants = await prisma.participant.findMany({
        where: {
            event_id: eventId,
        },
        select: {
            nipp:true,
        }
    });
    return participants.map(participant => participant.nipp);
}

export async function getAndShuffleParticipants(eventId: number): Promise<string[]> {
    const participants = await getNIPPParticipants(eventId);
    return shuffleArray(participants);
}

export const getWinnersDetail = async (req: NextRequest, eventId: number) => {
    try {
        const { winners } = await req.json();
        const participants = await prisma.participant.findMany({
            where: {
                nipp: {
                    in: winners,
                },
                event_id: eventId,
            },
            select: {
                nipp: true,
                name: true,
                operating_area: true,
            },
        });
        return NextResponse.json({ success: true, data: participants, message: "Success" }, { status: 200 } );
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "An unknown error occurred", message: "Error" }, { status: 500 });
    }
}

export async function getParticipants(eventId: number, nipps: string[]): Promise<Participant[]> {
    const participants = await prisma.participant.findMany({
        where: {
            event_id: eventId,
            nipp: {
                in: nipps,
            },
        },
    });
    return participants;

}

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}