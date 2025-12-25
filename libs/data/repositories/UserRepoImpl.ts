import 'server-only';

import {UserRepo} from "@/libs/domain/repositories/UserRepo";
import {PrismaClient} from "@prisma/client";
import {User} from "@/libs/domain/entities/User";
import {mapUserToDomain} from "@/libs/data/mappers/user";

export class UserRepoImpl implements UserRepo {

    constructor(private prismaClient: PrismaClient) {
    }

    async create(email: string, passwordHash: string): Promise<User> {
        const user = await this.prismaClient.user.create({data: {email, passwordHash}});
        return mapUserToDomain(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaClient.user.findUnique({where: {email}});
        if (!user) return null;
        return mapUserToDomain(user);
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prismaClient.user.findUnique({where: {id}});
        if (!user) return null;
        return mapUserToDomain(user);
    }
}
