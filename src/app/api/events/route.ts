import { createEvent } from "@/controllers/EventController";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    return createEvent(req, res);
}