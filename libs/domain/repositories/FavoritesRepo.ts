export interface FavoritesRepo {
    list(userId: string): Promise<string[]>;

    add(userId: string, name: string): Promise<boolean>;

    remove(userId: string, name: string): Promise<boolean>;

    isFavorite(userId: string, name: string): Promise<boolean>;
}
