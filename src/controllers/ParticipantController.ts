import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export interface Participant {
    nipp: string;
    name: string;
    operating_area: string;
    event_id: number;
}

export async function parseExcel(filePath: string, eventId: number): Promise<Participant[]> {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
    const readFile = fs.readFileSync(filePath);
    const workbook = XLSX.read(readFile, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const participantsData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const participants: Participant[] = participantsData.slice(1).map(row => ({
        nipp: row[0].toString(),
        name: row[1],
        operating_area: row[2],
        event_id: eventId,
    }));

    fs.unlinkSync(filePath);

    console.log("Participants", participants);
    return participants;
}
