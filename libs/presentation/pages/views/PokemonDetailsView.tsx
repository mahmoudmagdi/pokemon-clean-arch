"use client";

import Image from "next/image";
import FavoriteToggle from "../widgets/FavoriteToggle";
import {httpJson} from "@/libs/presentation/utils/http";
import {Pokemon} from "@/libs/domain/entities/Pokemon";
import {useEffect, useState} from "react";
import PokemonDetailsSkeleton from "@/libs/presentation/skeletons/PokemonDetailsSkeleton";

export default function PokemonDetailsView({name}: { name: string }) {

    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [cached, setCached] = useState<boolean | null>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        async function getPokemonDetails() {
            try {
                if (!mounted) return;
                const res = await httpJson<{
                    pokemon: Pokemon,
                    cached: boolean
                }>(`/api/pokemon/${encodeURIComponent(name)}`);
                setPokemon(res.pokemon);
                setCached(res.cached);
            } catch (err) {
                if (!mounted) return;
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        if (name) {
            getPokemonDetails();
        } else {
            setLoading(false);
        }

        return () => {
            mounted = false;
        };
    }, [name]);

    if (loading || !pokemon || cached === null) {
        return (
            <main className="mx-auto max-w-4xl p-6">
                <PokemonDetailsSkeleton/>
            </main>
        );
    }

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
