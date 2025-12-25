"use client";

import Link from "next/link";
import {useSession} from "@/libs/presentation/state/SessionProvider";

export function AppHeader() {
    const {status, isLoggedIn, user, logout} = useSession();
    return (
        <header className="flex items-center justify-between p-4 border-b">
            <Link href="/pokemon">Pokédex</Link>

            <nav className="flex items-center gap-4 text-sm">
                <Link href="/pokemon" className="hover:underline">Pokemon</Link>
                <Link href="/favorites" className="hover:underline">Favorites</Link>
                {status === "loading" ? (
                    <div>Loading...</div>
                ) : isLoggedIn ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm">{user.email}</span>
                        <button className="text-sm underline" onClick={() => void logout()}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </div>
                )}
            </nav>


        </header>
    );
}
