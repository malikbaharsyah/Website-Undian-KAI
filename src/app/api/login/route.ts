import { NextRequest} from "next/server";
import { login } from "@/controllers/LoginController";

export async function POST(req: NextRequest) {
    return login(req);
}