import Link from "next/link";
import {getContainer} from "@/libs/data/di/container";

export default async function PokemonListView() {
    const {useCases} = getContainer();
    const data = await useCases.listPokemon.execute(30, 0);
    return (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {
                data.items.map((p) => (
                    <Link key={p.name} href={`/pokemon/${encodeURIComponent(p.name)}`}
                          className="rounded-lg border p-3 hover:bg-slate-50">
                        <div className="font-semibold capitalize">{p.name}</div>
                        <div className="mt-1 text-sm text-slate-600">View details</div>
                    </Link>
                ))
            }
        </div>
    );
}
