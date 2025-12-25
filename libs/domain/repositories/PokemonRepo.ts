import type {Pokemon} from "../entities/Pokemon";

export interface PokemonRepo {
    list(limit: number, offset: number): Promise<{
        items: { name: string }[];
        nextOffset: number | null;
    }>;

    getByName(name: string): Promise<{
        pokemon: Pokemon;
        cached: boolean;
    }>;
}
