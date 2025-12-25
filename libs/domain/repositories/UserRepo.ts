import {User} from "@/libs/domain/entities/User";

export interface UserRepo {
    create(email: string, passwordHash: string): Promise<User>;

    findByEmail(email: string): Promise<User | null>;

    findById(id: string): Promise<User | null>;
}
