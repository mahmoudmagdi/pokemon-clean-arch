import {PokemonRepo} from "@/libs/domain/repositories/PokemonRepo";
import {ListPokemonUseCase} from "@/libs/domain/usecases/pokemon/ListPokemon";
import {GetPokemonDetailsUseCase} from "@/libs/domain/usecases/pokemon/GetPokemonDetails";
import {UserRepo} from "@/libs/domain/repositories/UserRepo";
import {FindByEmailUseCase} from "@/libs/domain/usecases/user/FindByEmail";
import {CreateNewUseCase} from "@/libs/domain/usecases/user/CreateNew";
import {FindByIdUseCase} from "@/libs/domain/usecases/user/FindById";
import {GetFavoritesUseCase} from "@/libs/domain/usecases/favorites/GetFavorites";
import {AddFavoriteUseCase} from "@/libs/domain/usecases/favorites/AddFavorite";
import {RemoveFavoriteUseCase} from "@/libs/domain/usecases/favorites/RemoveFavorite";
import {FavoritesRepo} from "@/libs/domain/repositories/FavoritesRepo";

export type MainApplicationContainer = {
    repos: {

        // Pokemon
        pokemonRepo: PokemonRepo,

        // user
        userRepo: UserRepo,

        // Favorites
        favoriteRepo: FavoritesRepo
    };
    useCases: {

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
};
