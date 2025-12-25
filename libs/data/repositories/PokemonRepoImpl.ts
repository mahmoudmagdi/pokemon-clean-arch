import 'server-only';

import {PokemonRepo} from "@/libs/domain/repositories/PokemonRepo";
import {Pokemon} from "@/libs/domain/entities/Pokemon";
import {PokemonRemoteService} from "@/libs/data/services/remote/PokemonRemoteService";
import {PokemonCacheService} from "@/libs/data/services/local/PokemonCacheService";
import {PokeApiPokemonSchema, PokemonApiPokemonDTO} from "@/libs/data/dto/pokemon";
import {mapPokeApiPokemonToDomain} from "@/libs/data/mappers/pokemon";
import {isCacheStale} from "@/libs/data/utils/cache";

export class PokemonRepoImpl implements PokemonRepo {
    constructor(
        private readonly remote: PokemonRemoteService,
        private readonly local: PokemonCacheService
    ) {
    }

    async list(limit: number, offset: number): Promise<{
        items: { name: string }[];
        nextOffset: number | null;
    }> {
        const res = await this.remote.fetchList(limit, offset);
        return {
            items: res.items,
            nextOffset: res.nextOffset,
        };
    }

    async getByName(name: string): Promise<{
        pokemon: Pokemon;
        cached: boolean;
    }> {
        const cachedRow = await this.local.get(name);

        if (cachedRow && !isCacheStale(cachedRow.updatedAt)) {
            const parsed = PokeApiPokemonSchema.safeParse(cachedRow.payload);
            if (parsed.success) {
                const domain = mapPokeApiPokemonToDomain(parsed.data);
                return {
                    pokemon: domain,
                    cached: true
                }
            }
        }

        const dto = await this.remote.fetchByName(name);
        const parsed = PokeApiPokemonSchema.parse(dto) as PokemonApiPokemonDTO;
        await this.local.upsert(name, parsed);

        return {
            pokemon: mapPokeApiPokemonToDomain(parsed),
            cached: false
        };
    }
}
