import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({success: true, message: 'Logout successful'},
        {
            headers: {
                'Set-Cookie': `token=; HttpOnly; Path=/; Max-Age=; SameSite=;`,
            },
        }
    );
}
