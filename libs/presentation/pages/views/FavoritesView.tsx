import Link from "next/link";
import RemoveFavoriteButton from "../widgets/RemoveFavoriteButton";
import {getContainer} from "@/libs/data/di/container";
import {requireUserToken} from "@/libs/data/utils/auth";
import {verifyToken} from "@/libs/data/utils/token";

export default async function FavoritesView() {
    const token = await requireUserToken();
    if (!token) {
        return (
            <div className="mt-6 rounded-lg border p-4 text-slate-700">
                No favorites yet (or you are not logged in).
            </div>
        );
    }

    const {useCases} = getContainer();
    const {userId} = await verifyToken(token);
    const items = await useCases.getFavorites.execute(userId);
    if (items.length === 0) {
        return (
            <div className="mt-6 rounded-lg border p-4 text-slate-700">
                No favorites yet (or you are not logged in).
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-3">
            {items.map((name) => (
                <div key={name} className="flex items-center justify-between rounded-lg border p-3">
                    <Link href={`/pokemon/${encodeURIComponent(name)}`}
                          className="font-semibold capitalize hover:underline">
                        {name}
                    </Link>
                    <RemoveFavoriteButton name={name}/>
                </div>
            ))}
        </div>
    );
}
