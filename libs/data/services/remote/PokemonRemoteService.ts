import 'server-only';

import {Pokemon} from "@/libs/domain/entities/Pokemon";

export interface PokemonRemoteService {
    fetchList(limit: number, offset: number): Promise<{
        items: { name: string }[];
        nextOffset: number | null;
    }>;

    fetchByName(name: string): Promise<Pokemon>;
}
