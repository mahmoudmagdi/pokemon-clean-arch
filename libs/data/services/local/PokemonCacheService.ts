import 'server-only';

import {PokemonCache} from "@prisma/client";

export interface PokemonCacheService {
    get(name: string): Promise<PokemonCache | null>;

    upsert(name: string, payload: object): Promise<void>;
}
