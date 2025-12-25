import React, {Suspense} from "react";
import PokemonListSkeleton from "@/libs/presentation/skeletons/PokemonListSkeleton";
import PokemonListView from "@/libs/presentation/pages/views/PokemonListView";

export default function PokemonListPage() {
    return (
        <main className="mx-auto max-w-4xl p-6">
            <h1 className="text-2xl font-semibold">Pokédex</h1>
            <p className="mt-1 text-slate-700">Browse Pokémon, then open a details page. Data is loaded via /app/api
                proxy routes.</p>

            <Suspense fallback={<PokemonListSkeleton/>}>
                {/* Server Component view that fetches data */}
                <PokemonListView/>
            </Suspense>
        </main>
    );
}
