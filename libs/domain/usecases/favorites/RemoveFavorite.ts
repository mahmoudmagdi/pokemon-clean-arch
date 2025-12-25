import {FavoritesRepo} from "@/libs/domain/repositories/FavoritesRepo";

export class RemoveFavoriteUseCase {
    constructor(private favoritesRepo: FavoritesRepo) {
    }

    async execute(userId: string, name: string) {
        return await this.favoritesRepo.remove(userId, name);
    }
}
