import React, {Suspense} from "react";
import PokemonDetailsView from "./views/PokemonDetailsView";
import PokemonDetailsSkeleton from "../skeletons/PokemonDetailsSkeleton";

export default function PokemonDetailsPage({name}: { name: string }) {
    return (
        <main className="mx-auto max-w-4xl p-6">
            <Suspense fallback={<PokemonDetailsSkeleton/>}>
                <PokemonDetailsView name={name}/>
            </Suspense>
        </main>
    );
}
