import PokemonDetailsSkeleton from "@/libs/presentation/skeletons/PokemonDetailsSkeleton";

export default function Loading() {
    return (
        <main className="mx-auto max-w-4xl p-6">
            <PokemonDetailsSkeleton/>
        </main>
    );
}
