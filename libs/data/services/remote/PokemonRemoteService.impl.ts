import 'server-only';

import {PokemonRemoteService} from "@/libs/data/services/remote/PokemonRemoteService";
import {PokemonApiPokemonDTO} from "@/libs/data/dto/pokemon";

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

    async fetchByName(name: string): Promise<PokemonApiPokemonDTO> {
        const res = await fetch(`${this.BASE_URL}/${name}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch Pokémon with name: ${name}`);
        }

        return await res.json();
    }
}
