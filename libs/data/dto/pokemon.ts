import {z} from "zod";

export const PokeApiPokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    types: z.array(z.object({type: z.object({name: z.string()})})),
    sprites: z.object({
        other: z
            .object({
                "official-artwork": z
                    .object({front_default: z.string().nullable().optional()})
                    .optional()
            })
            .optional()
    })
});

export type PokemonApiPokemonDTO = z.infer<typeof PokeApiPokemonSchema>;
