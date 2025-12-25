"use client";

import Link from "next/link";
import RemoveFavoriteButton from "../widgets/RemoveFavoriteButton";
import {useEffect, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";
import {useSession} from "@/libs/presentation/state/SessionProvider";

export default function FavoritesView() {

    const {isLoggedIn} = useSession();

    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        async function getFavorites() {
            const res = await httpJson<{ items: string[] }>(`/api/favorites`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            setItems(res.items);
        }

        if (isLoggedIn) {
            void getFavorites();
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <div className="mt-6 rounded-lg border p-4 text-slate-700">
                No favorites yet (or you are not logged in).
            </div>
        );
    }

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
                    <RemoveFavoriteButton name={name} onSuccess={() => {
                        setItems((prev) => prev.filter((item) => item !== name));
                    }}/>
                </div>
            ))}
        </div>
    );
}
