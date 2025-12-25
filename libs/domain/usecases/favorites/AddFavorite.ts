import {FavoritesRepo} from "@/libs/domain/repositories/FavoritesRepo";

export class AddFavoriteUseCase {
    constructor(private favoritesRepo: FavoritesRepo) {
    }

    async execute(userId: string, name: string): Promise<boolean> {
        return await this.favoritesRepo.add(userId, name);
    }
}
