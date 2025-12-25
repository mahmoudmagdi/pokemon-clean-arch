import React, {Suspense} from "react";
import FavoritesView from "./views/FavoritesView";
import FavoritesSkeleton from "../skeletons/FavoritesSkeleton";

export default function FavoritesPage() {
    return (
        <main className="mx-auto max-w-4xl p-6">
            <h1 className="text-2xl font-semibold">Favorites</h1>
            <p className="mt-1 text-slate-700">Favorites are stored in the local database per user (protected
                endpoints).</p>

            <Suspense fallback={<FavoritesSkeleton/>}>
                <FavoritesView/>
            </Suspense>
        </main>
    );
}
