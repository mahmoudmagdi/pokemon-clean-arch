import {clearAuthCookie} from "@/libs/data/utils/auth";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    await clearAuthCookie();
    return NextResponse.redirect(new URL("/login", request.url));
}
