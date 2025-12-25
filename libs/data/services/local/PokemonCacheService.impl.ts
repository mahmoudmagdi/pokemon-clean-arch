import 'server-only';

import {PokemonCacheService} from "@/libs/data/services/local/PokemonCacheService";
import prisma from "@/libs/data/prisma/client";
import {PokemonCache} from "@prisma/client";

export class PokemonCacheServiceImpl implements PokemonCacheService {
    async get(name: string): Promise<PokemonCache | null> {
        return prisma.pokemonCache.findUnique({where: {name}});
    }

    async upsert(name: string, payload: unknown) {
        await prisma.pokemonCache.upsert({
            where: {name},
            create: {name, payload: payload as object},
            update: {payload: payload as object}
        });
    }
}
