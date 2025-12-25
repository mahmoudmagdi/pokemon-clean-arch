import {clearAuthCookie} from "@/libs/data/utils/auth";
import {NextResponse} from "next/server";

export async function POST() {
    await clearAuthCookie();
    return NextResponse.json({ok: true});
}
