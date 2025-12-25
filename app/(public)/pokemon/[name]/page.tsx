import PokemonDetailsPage from "@/libs/presentation/pages/PokemonDetailsPage";

export default async function Page({params}: { params: Promise<{ name: string }> }) {
    const p = await params;
    return <PokemonDetailsPage name={p.name}/>;
}
