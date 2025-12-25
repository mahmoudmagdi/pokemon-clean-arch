import Link from "next/link";

export default function HomePage() {
    return (
        <main className="mx-auto max-w-4xl p-6">
            <h1 className="text-3xl font-semibold">Pokédex + Clean Architecture (Next.js App Router)</h1>
            <p className="mt-3 text-slate-700">
                This demo repo shows Clean Architecture applied to a frontend-first Next.js project: domain is pure,
                data implements ports, presentation renders via Suspense and skeletons.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
                <Link className="rounded-md bg-slate-900 px-4 py-2 text-white" href="/pokemon">Browse Pokémon</Link>
                <Link className="rounded-md border px-4 py-2" href="/register">Create account</Link>
                <Link className="rounded-md border px-4 py-2" href="/favorites">View favorites</Link>
            </div>
        </main>
    );
}
