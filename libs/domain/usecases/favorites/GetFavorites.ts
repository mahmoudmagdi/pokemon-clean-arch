import {FavoritesRepo} from "@/libs/domain/repositories/FavoritesRepo";

export class GetFavoritesUseCase {
    constructor(private favoritesRepo: FavoritesRepo) {
    }

    async execute(userId: string) {
        return this.favoritesRepo.list(userId);
    }
}
