import 'server-only';

import {UserRepo} from "@/libs/domain/repositories/UserRepo";
import {PrismaClient, User} from "@prisma/client";

export class UserRepoImpl implements UserRepo {

    constructor(private prismaClient: PrismaClient) {
    }

    async create(email: string, passwordHash: string): Promise<User> {
        return this.prismaClient.user.create({data: {email, passwordHash}});
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prismaClient.user.findUnique({where: {email}});
    }

    async findById(id: string): Promise<User | null> {
        return this.prismaClient.user.findUnique({where: {id}});
    }
}
