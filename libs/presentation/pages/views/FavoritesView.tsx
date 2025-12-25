import Link from "next/link";
import RemoveFavoriteButton from "../widgets/RemoveFavoriteButton";
import {requireUserToken} from "@/libs/data/utils/auth";
import {verifyToken} from "@/libs/data/utils/token";
import {getUseCases} from "@/libs/presentation/di/container";

export default async function FavoritesView() {

    const {getFavorites} = getUseCases();

    const token = await requireUserToken();
    const {userId} = await verifyToken(token);

    if (!token || !userId) {
        return (
            <div className="mt-6 rounded-lg border p-4 text-slate-700">
                No favorites yet (or you are not logged in).
            </div>
        );
    }

    const items = await getFavorites.execute(userId);
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
