import 'server-only';

import {getContainer} from "@/libs/data/di/container";
import {ListPokemonUseCase} from "@/libs/domain/usecases/pokemon/ListPokemon";
import {GetPokemonDetailsUseCase} from "@/libs/domain/usecases/pokemon/GetPokemonDetails";
import {GetFavoritesUseCase} from "@/libs/domain/usecases/favorites/GetFavorites";
import {AddFavoriteUseCase} from "@/libs/domain/usecases/favorites/AddFavorite";
import {RemoveFavoriteUseCase} from "@/libs/domain/usecases/favorites/RemoveFavorite";
import {CreateNewUseCase} from "@/libs/domain/usecases/user/CreateNew";
import {FindByEmailUseCase} from "@/libs/domain/usecases/user/FindByEmail";
import {FindByIdUseCase} from "@/libs/domain/usecases/user/FindById";

// IMPORTANT:
// This import is ONLY here, inside presentation/di.
// Presentation pages/components never import from libs/data directly.
export type PresentationUseCases = {
    // Pokemon
    listPokemon: ListPokemonUseCase;
    getPokemonDetails: GetPokemonDetailsUseCase;

    // user
    createNew: CreateNewUseCase;
    findByEmail: FindByEmailUseCase,
    findById: FindByIdUseCase,

    // Favorites
    addFavorite: AddFavoriteUseCase;
    getFavorites: GetFavoritesUseCase;
    removeFavorite: RemoveFavoriteUseCase;
};

// You can return the use cases directly,
// without exposing any repo/service implementations.
export function getUseCases(): PresentationUseCases {
    return getContainer().useCases;
}
