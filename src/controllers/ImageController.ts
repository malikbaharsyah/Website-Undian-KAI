import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(process.cwd(), 'uploads');

export async function getImage(type: string, id: string) {
    try {
        let filePath;
        if (type === 'events') {
            filePath = path.join(UPLOAD_PATH, type, `${id}.png`);
        } else {
            const ids = id.split('_');
            const eventId = ids[0];
            const prizeId = ids[1];
            filePath = path.join(UPLOAD_PATH, type, eventId, `${prizeId}.png`);
        }
        const file = fs.readFileSync(filePath);
        return new NextResponse(file, { status: 201, headers: { "Content-Type": 'image/png' } });
    } catch (error) {
        return NextResponse.json({ message: "File not found" }, { status: 404 });
    }
}
