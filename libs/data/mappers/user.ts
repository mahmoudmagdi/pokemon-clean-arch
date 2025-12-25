import {User} from "@/libs/domain/entities/User";
import {User as UserModel} from "@prisma/client";

export function mapUserToDomain(user: UserModel): User {
    return {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt
    };
}
