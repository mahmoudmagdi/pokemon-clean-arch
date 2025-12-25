import 'server-only';

import {Pokemon} from "@/libs/domain/entities/Pokemon";
import {PokemonRemoteService} from "@/libs/data/services/remote/PokemonRemoteService";

export class PokemonRemoteServiceImpl implements PokemonRemoteService {
    private readonly BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

    async fetchList(limit: number, offset: number): Promise<{
        items: { name: string }[];
        nextOffset: number | null;
    }> {
        const res = await fetch(`${this.BASE_URL}?limit=${limit}&offset=${offset}`);
        if (!res.ok) {
            throw new Error('Failed to fetch Pokémon list');
        }
        const data = await res.json();
        const nextOffset = data.next ? offset + limit : null;
        return {
            items: data.results,
            nextOffset,
        };
    }

    async fetchByName(name: string): Promise<Pokemon> {
        const res = await fetch(`${this.BASE_URL}/${name}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch Pokémon with name: ${name}`);
        }
        const data = await res.json();

        console.log(
            'Fetched Pokémon data:',
            {
                data
            }
        )
        return {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map((t: { type: { name: string } }) => t.type.name),
            imageUrl: data.sprites?.other?.["official-artwork"]?.front_default ?? null
        };
    }
}
