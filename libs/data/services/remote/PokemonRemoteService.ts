import 'server-only';

import {PokemonApiPokemonDTO} from "@/libs/data/dto/pokemon";

export interface PokemonRemoteService {
    fetchList(limit: number, offset: number): Promise<{
        items: { name: string }[];
        nextOffset: number | null;
    }>;

    fetchByName(name: string): Promise<PokemonApiPokemonDTO>;
}
