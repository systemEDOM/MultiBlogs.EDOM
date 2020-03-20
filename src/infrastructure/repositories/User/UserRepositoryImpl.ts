import { inject, injectable } from "inversify";
import { EntityRepository, getRepository } from "typeorm";
import { UserDTO } from "../../../core/domain/entities/UserDTO";
import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import { User } from "../../entities/User";
import { GenericRepositoryImpl } from "../GenericRepositoryImpl";

@EntityRepository(User)
@injectable()
export class UserRepositoryImpl extends GenericRepositoryImpl<UserDTO, User> implements UserRepository {
    public constructor() {
        super(getRepository(User));
    }

    public async findByUsername(username: string): Promise<User> {
        return await this.repository.findOneOrFail({ username });
    }
}
