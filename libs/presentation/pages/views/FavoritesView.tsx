"use server";

import Link from "next/link";
import RemoveFavoriteButton from "../widgets/RemoveFavoriteButton";
import {httpJson} from "@/libs/presentation/utils/http";
import {headers} from "next/headers";

async function getFavorites() {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/favorites`;
    const {res, status} = await httpJson<{ items: string[] }>(url, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Cookie": headersList.get("cookie") || ""},
    });

    if (status === 401) {
        return {isLoggedIn: false, items: []};
    }

    return {items: res.items, isLoggedIn: true};
}

export default async function FavoritesView() {

    const {items, isLoggedIn} = await getFavorites();

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
                You have no favorite Pokémon yet.
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
