import FavoritesSkeleton from "@/libs/presentation/skeletons/FavoritesSkeleton";

export default function Loading() {
    return (
        <main className="mx-auto max-w-4xl p-6">
            <FavoritesSkeleton/>
        </main>
    );
}
