"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {Pokemon} from "@/libs/domain/entities/Pokemon";
import {httpJson} from "@/libs/presentation/utils/http";
import PokemonListSkeleton from "@/libs/presentation/skeletons/PokemonListSkeleton";

export default function PokemonListView() {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Pokemon[]>([]);
    const limit = 50;
    const offset = 0;

    useEffect(() => {
        let mounted = true;
        (async function getPokemonDetails() {
            try {
                if (!mounted) return;
                const res = await httpJson<{
                    items: Pokemon[],
                    nextOffset: number | null
                }>(`/api/pokemon/list?limit=${limit}&offset=${offset}`);
                setItems(res.items);
            } catch (err) {
                if (!mounted) return;
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [limit, offset]);

    if (loading) {
        return (
            <main className="mx-auto max-w-4xl p-6">
                <PokemonListSkeleton/>
            </main>
        )
    }

    return (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {
                items.map((p) => (
                    <Link key={p.name} href={`/pokemon/${encodeURIComponent(p.name)}`}
                          className="rounded-lg border p-3 hover:bg-slate-50">
                        <div className="font-semibold capitalize">{p.name}</div>
                        <div className="mt-1 text-sm text-slate-600">View details</div>
                    </Link>
                ))
            }
        </div>
    );
}
