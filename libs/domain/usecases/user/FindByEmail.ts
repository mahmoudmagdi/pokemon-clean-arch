import {UserRepo} from "@/libs/domain/repositories/UserRepo";
import {User} from "@prisma/client";

export class FindByEmailUseCase {
    constructor(private userRepo: UserRepo) {
    }

    async execute(email: string): Promise<User | null> {
        return this.userRepo.findByEmail(email);
    }
}
