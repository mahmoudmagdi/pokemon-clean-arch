import {Skeleton} from "../components/Skeleton";

export default function PokemonListSkeleton() {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="rounded-lg border p-3">
                    <Skeleton className="h-5 w-2/3"/>
                    <Skeleton className="mt-3 h-4 w-1/2"/>
                </div>
            ))}
        </div>
    );
}
