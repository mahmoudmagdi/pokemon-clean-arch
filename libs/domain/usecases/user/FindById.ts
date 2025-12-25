import {UserRepo} from "@/libs/domain/repositories/UserRepo";
import {User} from "@prisma/client";

export class FindByIdUseCase {
    constructor(private userRepo: UserRepo) {
    }

    async execute(id: string): Promise<User | null> {
        return this.userRepo.findById(id);
    }
}
