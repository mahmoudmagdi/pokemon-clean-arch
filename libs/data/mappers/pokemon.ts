import {PokemonApiPokemonDTO} from "@/libs/data/dto/pokemon";
import {Pokemon} from "@/libs/domain/entities/Pokemon";

export function mapPokeApiPokemonToDomain(dto: PokemonApiPokemonDTO): Pokemon {
    return {
        id: dto.id,
        name: dto.name,
        height: dto.height,
        weight: dto.weight,
        types: dto.types.map((t) => t.type.name),
        imageUrl: dto.sprites?.other?.["official-artwork"]?.front_default ?? null
    };
}
