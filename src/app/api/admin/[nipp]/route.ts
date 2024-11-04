import { verifySuperadmin } from "@/controllers/LoginController";
import { getUserByNIPP } from "@/controllers/UserController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { nipp: string } }) {
    const { response, isRedirect } = await verifySuperadmin(req);
    if (isRedirect) {
        return response;
    }
    return getUserByNIPP(params.nipp);
}