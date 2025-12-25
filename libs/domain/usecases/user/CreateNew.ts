import {UserRepo} from "@/libs/domain/repositories/UserRepo";
import {User} from "@prisma/client";

export class CreateNewUseCase {
    constructor(private userRepo: UserRepo) {
    }

    async execute(email: string, passwordHash: string): Promise<User | null> {
        return this.userRepo.create(email, passwordHash);
    }
}
