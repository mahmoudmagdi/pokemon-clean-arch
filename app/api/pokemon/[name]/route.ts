import {NextResponse} from "next/server";
import {getContainer} from "@/libs/data/di/container";

export async function GET(req: Request, ctx: { params: Promise<{ name: string }> }) {
    const {name} = await ctx.params;
    const pokemonName = name.toLowerCase();

    const {useCases} = getContainer();
    const result = await useCases.getPokemonDetails.execute(pokemonName);

    return NextResponse.json({pokemon: result.pokemon, cached: result.cached});
}
