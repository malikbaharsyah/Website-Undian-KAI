import { NextRequest, NextResponse } from "next/server";

export const logout = async (req: NextRequest) => {
    try {
        // Clear the cookie
        return NextResponse.json({ message: "Successfully logged out" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
