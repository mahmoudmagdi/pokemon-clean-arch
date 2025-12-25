import {NextResponse} from "next/server";
import {getContainer} from "@/libs/data/di/container";
import {verifyToken} from "@/libs/data/utils/token";
import {requireUserToken} from "@/libs/data/utils/auth";

async function getUserIdFromRequest() {
    const token = await requireUserToken();
    const {userId} = await verifyToken(token);
    return userId ?? null;
}

async function handleFavorite(
    req: Request,
    ctx: { params: Promise<{ name: string }> },
    executor: (userId: string, pokemonName: string) => Promise<boolean>
) {
    const {name} = await ctx.params;
    const pokemonName = name.toLowerCase();

    const userId = await getUserIdFromRequest();
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
