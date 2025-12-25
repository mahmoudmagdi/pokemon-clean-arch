import {Skeleton} from "../components/Skeleton";

export default function PokemonDetailsSkeleton() {
    return (
        <div className="mt-6 rounded-lg border p-4">
            <Skeleton className="h-7 w-1/3"/>
            <Skeleton className="mt-4 h-48 w-full"/>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
            </div>
            <Skeleton className="mt-5 h-9 w-40"/>
        </div>
    );
}
