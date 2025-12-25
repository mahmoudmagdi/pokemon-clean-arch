import {NextResponse} from "next/server";
import {getContainer} from "@/libs/data/di/container";

export async function GET(ctx: { params: Promise<{ name: string }> }) {
    const p = await ctx.params;
    const name = p.name.toLowerCase();

    const {useCases} = getContainer();
    const result = await useCases.getPokemonDetails.execute(name);

    return NextResponse.json({pokemon: result.pokemon, cached: result.cached});
}
