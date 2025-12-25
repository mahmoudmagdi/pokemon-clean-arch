import {PokemonRepo} from "@/libs/domain/repositories/PokemonRepo";
import type {Pokemon} from "@/libs/domain/entities/Pokemon";

export class GetPokemonDetailsUseCase {
    constructor(private pokemonRepo: PokemonRepo) {
    }

    async execute(name: string): Promise<{
        pokemon: Pokemon;
        cached: boolean;
    }> {
        return this.pokemonRepo.getByName(name);
    }
}
