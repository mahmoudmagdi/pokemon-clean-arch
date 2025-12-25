import {jwtVerify, SignJWT} from "jose";

function getSecret() {
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET env var is required");
    return new TextEncoder().encode(secret);
}

export async function generateToken(payload: { userId: string }): Promise<string> {
    const secret = getSecret();
    return await new SignJWT({userId: payload.userId})
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function verifyToken(token: string | null): Promise<{ userId: string | null }> {
    if (!token) {
        return {userId: null}
    }
    const secret = getSecret();
    const {payload} = await jwtVerify(token, secret);
    return payload as { userId: string };
}
