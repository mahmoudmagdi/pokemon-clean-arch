import {UserRepo} from "@/libs/domain/repositories/UserRepo";
import {User} from "@/libs/domain/entities/User";


export class FindByIdUseCase {
    constructor(private userRepo: UserRepo) {
    }

    async execute(id: string): Promise<User | null> {
        return this.userRepo.findById(id);
    }
}
