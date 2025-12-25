"use server";

import Image from "next/image";
import FavoriteToggle from "../widgets/FavoriteToggle";
import {httpJson} from "@/libs/presentation/utils/http";
import {Pokemon} from "@/libs/domain/entities/Pokemon";
import {headers} from "next/headers";

async function getPokemonDetails(name: string) {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/pokemon/${encodeURIComponent(name)}`;
    return httpJson<{ pokemon: Pokemon, cached: boolean }>(url, {
        method: 'GET',
    });
}

export default async function PokemonDetailsView({name}: { name: string }) {

    const {res} = await getPokemonDetails(name);
    const {pokemon, cached} = res;

    return (
        <div className="mt-6 rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold capitalize">{pokemon.name}</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Source: {cached ? "Local cache" : "Remote"}
                    </p>
                </div>
                <FavoriteToggle pokemonName={pokemon.name}/>
            </div>

            <div className="mt-4">
                {pokemon.imageUrl ? (
                    <Image
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                        width={600}
                        height={400}
                        className="h-64 w-full rounded-md object-contain bg-slate-50"
                    />
                ) : (
                    <div className="h-64 w-full rounded-md bg-slate-50"/>
                )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-slate-50 p-2"><span className="font-semibold">ID:</span> {pokemon.id}
                </div>
                <div className="rounded-md bg-slate-50 p-2"><span
                    className="font-semibold">Types:</span> {pokemon.types.join(", ")}</div>
                <div className="rounded-md bg-slate-50 p-2"><span
                    className="font-semibold">Height:</span> {pokemon.height}
                </div>
                <div className="rounded-md bg-slate-50 p-2"><span
                    className="font-semibold">Weight:</span> {pokemon.weight}
                </div>
            </div>
        </div>
    );
}
