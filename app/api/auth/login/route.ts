import 'server-only';

import {NextResponse} from "next/server";
import {getContainer} from "@/libs/data/di/container";
import bcrypt from "bcryptjs";
import {z} from "zod";
import {generateToken} from "@/libs/data/utils/token";
import {setAuthCookie} from "@/libs/data/utils/auth";

const BodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export async function POST(req: Request) {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json({error: "Invalid input"}, {status: 400});
    }

    const {email, password} = parsed.data;

    const {useCases} = getContainer();

    const user = await useCases.findByEmail.execute(email);

    if (!user) {
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    const token = await generateToken({userId: user.id});
    await setAuthCookie(token);

    return NextResponse.json({success: true});
}
