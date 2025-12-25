import {NextResponse} from "next/server";
import {getContainer} from "@/libs/data/di/container";
import {z} from "zod";
import bcrypt from "bcryptjs";

const BodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export async function POST(req: Request) {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json({error: "Invalid input", issues: parsed.error.issues}, {status: 400});
    }

    const {email, password} = parsed.data;

    const {useCases} = getContainer();
    const exist = await useCases.findByEmail.execute(email);
    if (exist) {
        return NextResponse.json({error: "Email already registered"}, {status: 409});
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const created = await useCases.createNew.execute(email, passwordHash);

    if (!created) {
        return NextResponse.json({error: "Could not create user"}, {status: 500});
    }

    return NextResponse.json({ok: true});
}
