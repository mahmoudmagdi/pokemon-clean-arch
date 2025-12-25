import Link from "next/link";
import {requireUserToken} from "@/libs/data/utils/auth";

export async function AppHeader() {
    const token = await requireUserToken();
    return (
        <header className="border-b">
            <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
                <Link href="/" className="font-semibold">Pokédex Clean Architecture</Link>
                <nav className="flex items-center gap-4 text-sm">
                    <Link href="/pokemon" className="hover:underline">Pokemon</Link>
                    <Link href="/favorites" className="hover:underline">Favorites</Link>
                    {
                        token ? (
                            <form action="/api/auth/logout" method="post">
                                <button type="submit" className="hover:underline">Logout</button>
                            </form>
                        ) : (
                            <Link href="/login" className="hover:underline">Login</Link>
                        )
                    }
                </nav>
            </div>
        </header>
    );
}
