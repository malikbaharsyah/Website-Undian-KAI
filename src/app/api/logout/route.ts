import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({success: true, message: 'Logout successful'},
        {
            headers: {
                'Set-Cookie': `token=; HttpOnly; Path=/; Max-Age=; SameSite=;`,
            },
        }
    );
}
