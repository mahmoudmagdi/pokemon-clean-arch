import PokemonListSkeleton from "@/libs/presentation/skeletons/PokemonListSkeleton";

export default function Loading() {
    return (
        <main className="mx-auto max-w-4xl p-6">
            <PokemonListSkeleton/>
        </main>
    );
}
