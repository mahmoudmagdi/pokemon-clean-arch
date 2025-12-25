import 'server-only';

import {cookies} from "next/headers";

const COOKIE_NAME = "pokedex_token";

export async function setAuthCookie(token: string) {
    const cookiesObj = await cookies();
    cookiesObj.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60
    });
}

export async function clearAuthCookie() {
    const cookiesObj = await cookies();
    cookiesObj.delete(COOKIE_NAME);
}

export async function requireUserToken(): Promise<string | null> {
    const cookiesObj = await cookies();
    const token = cookiesObj.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return token;
}
