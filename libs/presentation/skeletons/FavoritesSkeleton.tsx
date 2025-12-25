import {Skeleton} from "@/libs/presentation/components/Skeleton";

export default function FavoritesSkeleton() {
    return (
        <div className="mt-6 space-y-3">
            {Array.from({length: 8}).map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <Skeleton className="h-5 w-40"/>
                    <Skeleton className="h-9 w-28"/>
                </div>
            ))}
        </div>
    );
}
