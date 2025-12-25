import {NextResponse} from "next/server";
import {getContainer} from "@/libs/data/di/container";
import {verifyToken} from "@/libs/data/utils/token";

async function getUserIdFromRequest(req: Request) {
    const authHeader = req.headers.get('Authentication') ?? req.headers.get('Authorization');
    if (!authHeader) return null;

    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = bearerMatch ? bearerMatch[1] : authHeader;
    const {userId} = await verifyToken(token);
    return userId ?? null;
}

async function handleFavorite(
    req: Request,
    ctx: { params: Promise<{ name: string }> },
    executor: (userId: string, pokemonName: string) => Promise<boolean>
) {
    const p = await ctx.params;
    const pokemonName = p.name.toLowerCase();

    const userId = await getUserIdFromRequest(req);
    if (!userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const success = await executor(userId, pokemonName);
    return NextResponse.json({success});
}

export async function POST(_req: Request, ctx: { params: Promise<{ name: string }> }) {
    const {useCases} = getContainer();
    return handleFavorite(_req, ctx, (userId, pokemonName) =>
        useCases.addFavorite.execute(userId, pokemonName)
    );
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ name: string }> }) {
    const {useCases} = getContainer();
    return handleFavorite(_req, ctx, (userId, pokemonName) =>
        useCases.removeFavorite.execute(userId, pokemonName)
    );
}
