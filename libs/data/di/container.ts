import 'server-only';

import {MainApplicationContainer} from "@/libs/data/di/types";
import {PokemonRemoteServiceImpl} from "@/libs/data/services/remote/PokemonRemoteService.impl";
import {PokemonCacheServiceImpl} from "@/libs/data/services/local/PokemonCacheService.impl";
import {PokemonRepoImpl} from "@/libs/data/repositories/PokemonRepoImpl";
import {ListPokemonUseCase} from "@/libs/domain/usecases/pokemon/ListPokemon";
import {GetPokemonDetailsUseCase} from "@/libs/domain/usecases/pokemon/GetPokemonDetails";
import {UserRepoImpl} from "@/libs/data/repositories/UserRepoImpl";
import {FindByEmailUseCase} from "@/libs/domain/usecases/user/FindByEmail";
import {CreateNewUseCase} from "@/libs/domain/usecases/user/CreateNew";
import {FindByIdUseCase} from "@/libs/domain/usecases/user/FindById";
import {AddFavoriteUseCase} from "@/libs/domain/usecases/favorites/AddFavorite";
import {FavoritesRepoImpl} from "@/libs/data/repositories/FavoritesRepoImpl";
import {RemoveFavoriteUseCase} from "@/libs/domain/usecases/favorites/RemoveFavorite";
import {GetFavoritesUseCase} from "@/libs/domain/usecases/favorites/GetFavorites";
import prisma from "@/libs/data/prisma/client";

// Dev HMR guard (avoid multiple instances during Next dev reloads)
const globalForContainer = globalThis as unknown as { __appContainer?: MainApplicationContainer };

let singleton: MainApplicationContainer | undefined = globalForContainer.__appContainer;

function buildContainer(): MainApplicationContainer {

    // remote services
    const pokemonRemoteService = new PokemonRemoteServiceImpl();

    // local services
    const pokemonCacheService = new PokemonCacheServiceImpl();

    // repositories
    const pokemonRepo = new PokemonRepoImpl(pokemonRemoteService, pokemonCacheService);
    const userRepo = new UserRepoImpl(prisma);
    const favoriteRepo = new FavoritesRepoImpl(prisma);

    // use cases - pokemon
    const listPokemon = new ListPokemonUseCase(pokemonRepo);
    const getPokemonDetails = new GetPokemonDetailsUseCase(pokemonRepo);

    // use cases - user
    const createNew = new CreateNewUseCase(userRepo)
    const findByEmail = new FindByEmailUseCase(userRepo);
    const findById = new FindByIdUseCase(userRepo);

    // use cases - favorite
    const addFavorite = new AddFavoriteUseCase(favoriteRepo);
    const removeFavorite = new RemoveFavoriteUseCase(favoriteRepo);
    const getFavorites = new GetFavoritesUseCase(favoriteRepo);

    return {
        repos: {
            pokemonRepo,
            userRepo,
            favoriteRepo
        },
        useCases: {
            listPokemon,
            getPokemonDetails,

            createNew,
            findByEmail,
            findById,

            addFavorite,
            removeFavorite,
            getFavorites
        }
    };
}

/** Get the global container (process-singleton). */
export function getContainer(): MainApplicationContainer {
    if (!singleton) {
        singleton = buildContainer();
        if (process.env.NODE_ENV !== 'production') {
            globalForContainer.__appContainer = singleton;
        }
    }
    return singleton;
}
