import { verifySuperadmin } from "@/controllers/LoginController";
import { getUsersByPage, createUser, updateUser, deleteUser } from "@/controllers/UserController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { response, isRedirect } = await verifySuperadmin(req);
    if (isRedirect) {
        return response;
    }
    return createUser(req);
}

export async function GET(req: NextRequest) {
    const { response, isRedirect } = await verifySuperadmin(req);
    if (isRedirect) {
        return response;
    }
    return getUsersByPage(req);
}

export async function PUT(req: NextRequest) {
    const { response, isRedirect } = await verifySuperadmin(req);
    if (isRedirect) {
        return response;
    }
    return updateUser(req);
}

export async function DELETE(req: NextRequest) {
    const { response, isRedirect } = await verifySuperadmin(req);
    if (isRedirect) {
        return response;
    }
    return deleteUser(req);
}