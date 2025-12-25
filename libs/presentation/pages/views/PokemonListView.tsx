"use server";

import Link from "next/link";
import {Pokemon} from "@/libs/domain/entities/Pokemon";
import {httpJson} from "@/libs/presentation/utils/http";
import {headers} from "next/headers";

async function getPokemonList(limit: number, offset: number) {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/pokemon/list?limit=${limit}&offset=${offset}`;
    return httpJson<{ items: Pokemon[], nextOffset: number | null }>(url, {
        method: 'GET'
    });
}

export default async function PokemonListView() {

    const limit = 50;
    const offset = 0;
    const {res} = await getPokemonList(limit, offset);
    const items = res.items;

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
