import {FavoritesRepo} from "@/libs/domain/repositories/FavoritesRepo";
import {PrismaClient} from "@prisma/client";

export class FavoritesRepoImpl implements FavoritesRepo {

    constructor(private prismaClient: PrismaClient) {
    }

    async list(userId: string): Promise<string[]> {
        const rows = await this.prismaClient.favorite.findMany({
            where: {userId},
            orderBy: {createdAt: "desc"},
            select: {name: true}
        });

        return rows.map(r => r.name);
    }

    async add(userId: string, name: string): Promise<boolean> {
        const success = await this.prismaClient.favorite.upsert({
            where: {userId_name: {userId, name}},
            create: {userId, name},
            update: {}
        });
        return success !== null;
    }

    async remove(userId: string, name: string): Promise<boolean> {
        const success = await this.prismaClient.favorite.deleteMany({where: {userId, name}});
        return success.count > 0;
    }

    async isFavorite(userId: string, name: string): Promise<boolean> {
        const count = await this.prismaClient.favorite.count({where: {userId, name}});
        return count > 0;
    }
}
