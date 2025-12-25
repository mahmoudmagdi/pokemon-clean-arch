"use client";

import {useEffect, useMemo, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";
import {requireUserToken} from "@/libs/data/utils/auth";

export default function FavoriteToggle({pokemonName}: { pokemonName: string }) {

    const normalized = useMemo(() => pokemonName.toLowerCase(), [pokemonName]);

    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isFav, setIsFav] = useState<boolean | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const token = await requireUserToken();
            if (!token) {
                setIsFav(false);
                return;
            }

            setToken(token);
            try {
                const res = await httpJson<{ items: string[] }>("/api/favorites", {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                });
                if (!cancelled) setIsFav(res.items.includes(normalized));
            } catch {
                if (!cancelled) setIsFav(null);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [normalized]);

    async function toggle() {
        if (!token) {
            alert("Please login to manage favorites.");
            return;
        }
        if (isFav === null) return;

        setLoading(true);
        try {
            if (isFav) {
                const res = await httpJson<{ success: boolean }>(`/api/favorites/${encodeURIComponent(normalized)}`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                });
                if (res.success) setIsFav(false);
            } else {
                const res = await httpJson<{ success: boolean }>(`/api/favorites/${encodeURIComponent(normalized)}`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                });
                if (res.success) setIsFav(true);
            }
        } finally {
            setLoading(false);
        }
    }

    const label = (token) ? (isFav ? "Unfavorite" : "Favorite") : "Login to favorite";

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
