"use client";

import {useEffect, useMemo, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";
import {requireUserToken} from "@/libs/data/utils/auth";
import {useRouter} from "next/navigation";

export default function RemoveFavoriteButton({name}: { name: string }) {

    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const normalized = useMemo(() => name.toLowerCase(), [name]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await requireUserToken();
            if (!token) {
                return;
            }

            setToken(token);
        })();
        return () => {
        };
    }, [normalized]);

    async function remove() {
        setLoading(true);
        if (!token) {
            return;
        }

        await httpJson<{ success: boolean }>(`/api/favorites/${encodeURIComponent(normalized)}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        });
        setLoading(false);
        router.refresh();
    }

    return (
        <button
            onClick={remove}
            disabled={loading}
            className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
        >
            {loading ? "Removing..." : "Remove"}
        </button>
    );
}
