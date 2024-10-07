import { NextResponse } from "next/server";

export const logout = async () => {
    try {
        return NextResponse.json({ message: "Successfully logged out" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to log out" }, { status: 500 });
    }
}
