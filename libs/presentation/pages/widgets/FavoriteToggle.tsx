"use client";

import {useEffect, useMemo, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";

export default function FavoriteToggle({userToken, pokemonName}: { userToken: string | null, pokemonName: string }) {

    const normalized = useMemo(() => pokemonName.toLowerCase(), [pokemonName]);
    const [loading, setLoading] = useState(false);
    const [isFav, setIsFav] = useState<boolean | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!userToken) {
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
    }, [normalized, userToken]);

    async function toggle() {
        if (!userToken) {
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

    const label = (userToken) ? (isFav ? "Unfavorite" : "Favorite") : "Login to favorite";

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
