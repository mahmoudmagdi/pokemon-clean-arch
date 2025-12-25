import {clearAuthCookie} from "@/libs/data/utils/auth";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    await clearAuthCookie();
    NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.json({ok: true});
}
