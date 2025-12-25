import {PokemonRepo} from "@/libs/domain/repositories/PokemonRepo";

export class ListPokemonUseCase {
    constructor(private pokemonRepo: PokemonRepo) {
    }

    async execute(limit: number, offset: number): Promise<{
        items: { name: string }[];
        nextOffset: number | null;
    }> {
        return this.pokemonRepo.list(limit, offset);
    }
}
