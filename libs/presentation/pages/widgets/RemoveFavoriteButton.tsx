"use client";

import {useMemo, useState} from "react";
import {httpJson} from "@/libs/presentation/utils/http";
import {useRouter} from "next/navigation";

export default function RemoveFavoriteButton({name, onSuccess}: { name: string, onSuccess?: () => void }) {

    const router = useRouter();
    const normalizedName = useMemo(() => name.toLowerCase(), [name]);

    const [loading, setLoading] = useState(false);

    async function remove() {
        setLoading(true);
        const rest = await httpJson<{ success: boolean }>(`/api/favorites/${encodeURIComponent(normalizedName)}`, {
            method: "DELETE"
        });

        if (rest.success) {
            router.refresh();
            onSuccess?.();
        }
        setLoading(false);
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
