"use client";

import {useEffect, useMemo, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";
import {useSession} from "@/libs/presentation/state/SessionProvider";

export default function FavoriteToggle({pokemonName}: { pokemonName: string }) {

    const {isLoggedIn} = useSession();
    const normalized = useMemo(() => pokemonName.toLowerCase(), [pokemonName]);
    const [loading, setLoading] = useState(false);
    const [isFav, setIsFav] = useState<boolean | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!isLoggedIn) {
                setIsFav(false);
                return;
            }

            try {
                const res = await httpJson<{ items: string[] }>("/api/favorites", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
                if (!cancelled) setIsFav(res.items.includes(normalized));
            } catch {
                if (!cancelled) setIsFav(null);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [normalized, isLoggedIn]);

    async function toggle() {
        if (!isLoggedIn) {
            alert("Please login to manage favorites.");
            return;
        }

        if (isFav === null) return;

        setLoading(true);
        try {
            if (isFav) {
                const res = await httpJson<{ success: boolean }>(`/api/favorites/${encodeURIComponent(normalized)}`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                });
                if (res.success) setIsFav(false);
            } else {
                const res = await httpJson<{ success: boolean }>(`/api/favorites/${encodeURIComponent(normalized)}`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                });
                if (res.success) setIsFav(true);
            }
        } finally {
            setLoading(false);
        }
    }

    const label = (isLoggedIn) ? (isFav ? "Unfavorite" : "Favorite") : "Login to favorite";

    return (
        <button
            onClick={toggle}
            disabled={loading || isFav === null}
            className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
        >
            {loading ? "Working..." : label}
        </button>
    );
}
